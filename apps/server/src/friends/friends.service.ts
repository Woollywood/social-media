import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { NotificationsGateway } from '../notifications/notifications.gateway';
import { WS_EVENTS } from '../notifications/ws-events';
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

    const requester = await this.usersService.findPublicById(requesterId);
    if (!requester) {
      throw new NotFoundException('Requester not found.');
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
          payload: { requestId: request.id, requesterId, sender: requester },
        },
      });

      this.notificationsGateway.emitToUser(
        receiverId,
        WS_EVENTS.notifications.new,
        {
          type: 'FRIEND_REQUEST',
          requestId: request.id,
          requesterId,
          sender: requester,
        },
      );
      this.notificationsGateway.emitToUser(
        receiverId,
        WS_EVENTS.friends.requestCreated,
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
        include: {
          requester: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              email: true,
              username: true,
              avatarUrl: true,
            },
          },
          receiver: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              email: true,
              username: true,
              avatarUrl: true,
            },
          },
        },
      }),
      this.prismaService.friendRequest.count({ where }),
    ]);

    const relatedUsers = items.flatMap((item) => [
      item.requester,
      item.receiver,
    ]);
    const uniqueUsers = Array.from(
      new Map(relatedUsers.map((user) => [user.id, user])).values(),
    );
    const usersWithMutuals = await this.usersService.addMutualFriendsCount(
      userId,
      uniqueUsers,
    );
    const usersById = new Map(usersWithMutuals.map((user) => [user.id, user]));

    return {
      items: items.map((item) => ({
        ...item,
        requester: usersById.get(item.requester.id) ?? item.requester,
        receiver: usersById.get(item.receiver.id) ?? item.receiver,
      })),
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
              username: true,
              avatarUrl: true,
            },
          },
        },
      }),
      this.prismaService.friendship.count({ where: { userId } }),
    ]);

    const friends = await this.usersService.addMutualFriendsCount(
      userId,
      items.map((item) => item.friend),
    );
    const friendsById = new Map(friends.map((friend) => [friend.id, friend]));

    return {
      items: items.map((item) => ({
        ...item,
        friend: friendsById.get(item.friend.id) ?? item.friend,
      })),
      meta: buildPaginationMeta(total, pagination.page, pagination.limit),
    };
  }

  listUsersToFriend(userId: string, pagination: PaginationResult) {
    return this.usersService.listNonFriends(userId, pagination);
  }

  listPossibleFriends(userId: string, pagination: PaginationResult) {
    return this.usersService.listPossibleFriends(userId, pagination);
  }

  async removeFriend(userId: string, friendId: string) {
    if (userId === friendId) {
      throw new BadRequestException('Cannot remove yourself from friends.');
    }

    const remover = await this.usersService.findPublicById(userId);
    if (!remover) {
      throw new NotFoundException('User not found.');
    }

    const existing = await this.prismaService.friendship.findFirst({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
      select: { id: true },
    });
    if (!existing) {
      throw new NotFoundException('Friendship not found.');
    }

    await this.prismaService.friendship.deleteMany({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    });

    const pendingRequest = await this.prismaService.friendRequest.findFirst({
      where: {
        status: FriendRequestStatus.Pending,
        OR: [
          { requesterId: userId, receiverId: friendId },
          { requesterId: friendId, receiverId: userId },
        ],
      },
      select: { id: true },
    });
    if (!pendingRequest) {
      await this.prismaService.friendRequest.create({
        data: {
          requesterId: friendId,
          receiverId: userId,
          status: FriendRequestStatus.Pending,
        },
      });
    }

    const notification = await this.prismaService.notification.create({
      data: {
        recipientId: friendId,
        type: 'FRIEND_REMOVED',
        payload: { removedBy: userId, sender: remover },
      },
    });

    this.notificationsGateway.emitToUser(
      friendId,
      WS_EVENTS.notifications.new,
      {
        id: notification.id,
        type: notification.type,
        payload: notification.payload,
        sender: remover,
        friendId: userId,
      },
    );
    this.notificationsGateway.emitToUser(friendId, WS_EVENTS.friends.updated, {
      friendId: userId,
    });

    return { success: true };
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

    const receiver = await this.usersService.findPublicById(userId);
    if (!receiver) {
      throw new NotFoundException('User not found.');
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
          payload: {
            requestId: request.id,
            friendId: request.receiverId,
            sender: receiver,
          },
        },
      });

      this.notificationsGateway.emitToUser(
        request.requesterId,
        WS_EVENTS.notifications.new,
        {
          type: 'FRIEND_ACCEPT',
          requestId: request.id,
          friendId: request.receiverId,
          sender: receiver,
        },
      );
      this.notificationsGateway.emitToUser(
        request.requesterId,
        WS_EVENTS.friends.requestAccepted,
        {
          requestId: request.id,
          friendId: request.receiverId,
        },
      );
      this.notificationsGateway.emitToUser(
        request.receiverId,
        WS_EVENTS.friends.requestAccepted,
        {
          requestId: request.id,
          friendId: request.requesterId,
        },
      );
      this.notificationsGateway.emitToUser(
        request.requesterId,
        WS_EVENTS.friends.updated,
        { friendId: request.receiverId },
      );
      this.notificationsGateway.emitToUser(
        request.receiverId,
        WS_EVENTS.friends.updated,
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

    const receiver = await this.usersService.findPublicById(userId);
    if (!receiver) {
      throw new NotFoundException('User not found.');
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
          payload: {
            requestId: request.id,
            friendId: request.receiverId,
            sender: receiver,
          },
        },
      });

      this.notificationsGateway.emitToUser(
        request.requesterId,
        WS_EVENTS.notifications.new,
        {
          type: 'FRIEND_DECLINE',
          requestId: request.id,
          friendId: request.receiverId,
          sender: receiver,
        },
      );
      this.notificationsGateway.emitToUser(
        request.requesterId,
        WS_EVENTS.friends.requestDeclined,
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

    const requester = await this.usersService.findPublicById(userId);
    if (!requester) {
      throw new NotFoundException('User not found.');
    }

    await this.prismaService.notification.create({
      data: {
        recipientId: request.receiverId,
        type: 'FRIEND_REQUEST_CANCELLED',
        payload: {
          requestId: request.id,
          requesterId: request.requesterId,
          sender: requester,
        },
      },
    });

    this.notificationsGateway.emitToUser(
      request.receiverId,
      WS_EVENTS.notifications.new,
      {
        type: 'FRIEND_REQUEST_CANCELLED',
        requestId: request.id,
        requesterId: request.requesterId,
        sender: requester,
      },
    );

    this.notificationsGateway.emitToUser(
      request.receiverId,
      WS_EVENTS.friends.requestCancelled,
      {
        requestId: request.id,
        requesterId: request.requesterId,
      },
    );

    return updated;
  }
}
