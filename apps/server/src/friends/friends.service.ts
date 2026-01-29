import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { NotificationsGateway } from '../notifications/notifications.gateway';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { buildPaginationMeta, type PaginationResult } from '../utils';

import { FriendRequestDirection } from './dto/friend-request-direction.enum';
import { FriendRequestStatus } from './dto/friend-request-status.enum';

@Injectable()
export class FriendsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async sendRequest(requesterId: string, receiverId: string) {
    if (requesterId === receiverId) {
      throw new BadRequestException('Cannot send friend request to yourself.');
    }

    const receiver = await this.usersService.findById(receiverId);
    if (!receiver) {
      throw new NotFoundException('Receiver not found.');
    }

    const existingFriendship = await this.prismaService.friendship.findFirst({
      where: {
        OR: [
          { userId: requesterId, friendId: receiverId },
          { userId: receiverId, friendId: requesterId },
        ],
      },
      select: { id: true },
    });
    if (existingFriendship) {
      throw new ConflictException('Users are already friends.');
    }

    const existingPending = await this.prismaService.friendRequest.findFirst({
      where: {
        status: FriendRequestStatus.Pending,
        OR: [
          { requesterId, receiverId },
          { requesterId: receiverId, receiverId: requesterId },
        ],
      },
      select: { id: true, requesterId: true, receiverId: true },
    });
    if (existingPending) {
      if (existingPending.requesterId === requesterId) {
        throw new ConflictException('Friend request already exists.');
      }

      return this.acceptRequest(requesterId, existingPending.id);
    }

    return this.prismaService.$transaction(async (tx) => {
      const request = await tx.friendRequest.create({
        data: {
          requesterId,
          receiverId,
          status: FriendRequestStatus.Pending,
        },
      });

      await tx.notification.create({
        data: {
          recipientId: receiverId,
          type: 'FRIEND_REQUEST',
          payload: { requestId: request.id, requesterId },
        },
      });

      this.notificationsGateway.emitToUser(receiverId, 'notifications:new', {
        type: 'FRIEND_REQUEST',
        requestId: request.id,
        requesterId,
      });
      this.notificationsGateway.emitToUser(
        receiverId,
        'friends:request:created',
        {
          requestId: request.id,
          requesterId,
        },
      );

      return request;
    });
  }

  async listRequests(
    userId: string,
    pagination: PaginationResult,
    direction?: FriendRequestDirection,
    status?: FriendRequestStatus,
  ) {
    const requestDirection = direction ?? FriendRequestDirection.In;
    const requestStatus = status ?? FriendRequestStatus.Pending;

    const where =
      requestDirection === FriendRequestDirection.In
        ? { receiverId: userId, status: requestStatus }
        : { requesterId: userId, status: requestStatus };

    const [items, total] = await this.prismaService.$transaction([
      this.prismaService.friendRequest.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prismaService.friendRequest.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, pagination.page, pagination.limit),
    };
  }

  async listFriends(userId: string, pagination: PaginationResult) {
    const [items, total] = await this.prismaService.$transaction([
      this.prismaService.friendship.findMany({
        where: { userId },
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          createdAt: true,
          friend: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              email: true,
            },
          },
        },
      }),
      this.prismaService.friendship.count({ where: { userId } }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, pagination.page, pagination.limit),
    };
  }

  async acceptRequest(userId: string, requestId: string) {
    const request = await this.prismaService.friendRequest.findUnique({
      where: { id: requestId },
    });
    if (!request) {
      throw new NotFoundException('Friend request not found.');
    }
    if (request.receiverId !== userId) {
      throw new ForbiddenException('Cannot accept this request.');
    }
    if (request.status !== FriendRequestStatus.Pending) {
      throw new ConflictException('Friend request is not pending.');
    }

    return this.prismaService.$transaction(async (tx) => {
      const updated = await tx.friendRequest.update({
        where: { id: requestId },
        data: {
          status: FriendRequestStatus.Accepted,
          respondedAt: new Date(),
        },
      });

      await tx.friendship.createMany({
        data: [
          {
            userId: request.requesterId,
            friendId: request.receiverId,
            sourceRequestId: request.id,
          },
          {
            userId: request.receiverId,
            friendId: request.requesterId,
            sourceRequestId: request.id,
          },
        ],
        skipDuplicates: true,
      });

      await tx.notification.create({
        data: {
          recipientId: request.requesterId,
          type: 'FRIEND_ACCEPT',
          payload: { requestId: request.id, friendId: request.receiverId },
        },
      });

      this.notificationsGateway.emitToUser(
        request.requesterId,
        'notifications:new',
        {
          type: 'FRIEND_ACCEPT',
          requestId: request.id,
          friendId: request.receiverId,
        },
      );
      this.notificationsGateway.emitToUser(
        request.requesterId,
        'friends:request:accepted',
        {
          requestId: request.id,
          friendId: request.receiverId,
        },
      );
      this.notificationsGateway.emitToUser(
        request.receiverId,
        'friends:request:accepted',
        {
          requestId: request.id,
          friendId: request.requesterId,
        },
      );
      this.notificationsGateway.emitToUser(
        request.requesterId,
        'friends:updated',
        { friendId: request.receiverId },
      );
      this.notificationsGateway.emitToUser(
        request.receiverId,
        'friends:updated',
        { friendId: request.requesterId },
      );

      return updated;
    });
  }

  async declineRequest(userId: string, requestId: string) {
    const request = await this.prismaService.friendRequest.findUnique({
      where: { id: requestId },
    });
    if (!request) {
      throw new NotFoundException('Friend request not found.');
    }
    if (request.receiverId !== userId) {
      throw new ForbiddenException('Cannot decline this request.');
    }
    if (request.status !== FriendRequestStatus.Pending) {
      throw new ConflictException('Friend request is not pending.');
    }

    return this.prismaService.$transaction(async (tx) => {
      const updated = await tx.friendRequest.update({
        where: { id: requestId },
        data: {
          status: FriendRequestStatus.Declined,
          respondedAt: new Date(),
        },
      });

      await tx.notification.create({
        data: {
          recipientId: request.requesterId,
          type: 'FRIEND_DECLINE',
          payload: { requestId: request.id, friendId: request.receiverId },
        },
      });

      this.notificationsGateway.emitToUser(
        request.requesterId,
        'notifications:new',
        {
          type: 'FRIEND_DECLINE',
          requestId: request.id,
          friendId: request.receiverId,
        },
      );
      this.notificationsGateway.emitToUser(
        request.requesterId,
        'friends:request:declined',
        {
          requestId: request.id,
          friendId: request.receiverId,
        },
      );

      return updated;
    });
  }

  async cancelRequest(userId: string, requestId: string) {
    const request = await this.prismaService.friendRequest.findUnique({
      where: { id: requestId },
    });
    if (!request) {
      throw new NotFoundException('Friend request not found.');
    }
    if (request.requesterId !== userId) {
      throw new ForbiddenException('Cannot cancel this request.');
    }
    if (request.status !== FriendRequestStatus.Pending) {
      throw new ConflictException('Friend request is not pending.');
    }

    const updated = await this.prismaService.friendRequest.update({
      where: { id: requestId },
      data: {
        status: FriendRequestStatus.Cancelled,
        respondedAt: new Date(),
      },
    });

    this.notificationsGateway.emitToUser(
      request.receiverId,
      'friends:request:cancelled',
      {
        requestId: request.id,
        requesterId: request.requesterId,
      },
    );

    return updated;
  }
}
