import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/browser';

import { FriendRequestStatus } from '../friends/dto/friend-request-status.enum';
import { PrismaService } from '../prisma/prisma.service';
import { buildPaginationMeta, type PaginationResult } from '../utils';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  findById(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  findPublicById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        email: true,
        username: true,
        avatarUrl: true,
      },
    });
  }

  create(
    email: string,
    username: string,
    passwordHash: string,
    avatarUrl?: string,
  ) {
    return this.prismaService.user.create({
      data: { email, username, passwordHash, avatarUrl },
    });
  }

  async list(userId: string, pagination: PaginationResult) {
    const [items, total] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          email: true,
          username: true,
        },
      }),
      this.prismaService.user.count(),
    ]);

    return {
      items: await this.addMutualFriendsCount(userId, items),
      meta: buildPaginationMeta(total, pagination.page, pagination.limit),
    };
  }

  async listNonFriends(userId: string, pagination: PaginationResult) {
    const where = {
      id: { not: userId },
      friendships: { none: { friendId: userId } },
      friendsOf: { none: { userId } },
      friendRequestsReceived: {
        none: { requesterId: userId, status: FriendRequestStatus.Pending },
      },
    };
    const [items, total] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          email: true,
          username: true,
          avatarUrl: true,
        },
      }),
      this.prismaService.user.count({ where }),
    ]);

    return {
      items: await this.addMutualFriendsCount(userId, items),
      meta: buildPaginationMeta(total, pagination.page, pagination.limit),
    };
  }

  async listPossibleFriends(userId: string, pagination: PaginationResult) {
    const friendIds = await this.getFriendIds(userId);
    const pendingRequests = await this.prismaService.friendRequest.findMany({
      where: {
        status: FriendRequestStatus.Pending,
        OR: [{ requesterId: userId }, { receiverId: userId }],
      },
      select: { requesterId: true, receiverId: true },
    });
    const pendingUserIds = new Set<string>();
    pendingRequests.forEach((request) => {
      if (request.requesterId !== userId) {
        pendingUserIds.add(request.requesterId);
      }
      if (request.receiverId !== userId) {
        pendingUserIds.add(request.receiverId);
      }
    });
    const orFilters: Prisma.UserWhereInput[] = [];
    if (friendIds.size) {
      orFilters.push({
        friendships: { some: { friendId: { in: Array.from(friendIds) } } },
      });
    }
    if (pendingUserIds.size) {
      orFilters.push({
        friendships: {
          some: { friendId: { in: Array.from(pendingUserIds) } },
        },
      });
    }
    const where = {
      id: { not: userId },
      friendships: { none: { friendId: userId } },
      friendsOf: { none: { userId } },
      friendRequestsReceived: {
        none: { requesterId: userId, status: FriendRequestStatus.Pending },
      },
      friendRequestsSent: {
        none: { receiverId: userId, status: FriendRequestStatus.Pending },
      },
      OR: orFilters,
    };

    const [items, total] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          email: true,
          username: true,
          avatarUrl: true,
        },
      }),
      this.prismaService.user.count({ where }),
    ]);

    return {
      items: await this.addMutualFriendsCount(userId, items),
      meta: buildPaginationMeta(total, pagination.page, pagination.limit),
    };
  }

  async addMutualFriendsCount<
    T extends { id: string; mutualFriendsCount?: number },
  >(userId: string, users: T[]) {
    if (!users.length) {
      return users;
    }

    const userFriendIds = await this.getFriendIds(userId);
    if (!userFriendIds.size) {
      return users.map((user) => ({ ...user, mutualFriendsCount: 0 }));
    }

    const candidateIds = users.map((user) => user.id);
    const candidateFriendships = await this.prismaService.friendship.findMany({
      where: { userId: { in: candidateIds } },
      select: { userId: true, friendId: true },
    });

    const friendsByUser = new Map<string, Set<string>>();
    candidateFriendships.forEach(({ userId: candidateId, friendId }) => {
      const existing = friendsByUser.get(candidateId);
      if (existing) {
        existing.add(friendId);
      } else {
        friendsByUser.set(candidateId, new Set([friendId]));
      }
    });

    return users.map((user) => {
      const candidateFriends = friendsByUser.get(user.id);
      if (!candidateFriends?.size) {
        return { ...user, mutualFriendsCount: 0 };
      }

      let mutualCount = 0;
      candidateFriends.forEach((friendId) => {
        if (userFriendIds.has(friendId)) {
          mutualCount += 1;
        }
      });

      return { ...user, mutualFriendsCount: mutualCount };
    });
  }

  private async getFriendIds(userId: string) {
    const friendships = await this.prismaService.friendship.findMany({
      where: { userId },
      select: { friendId: true },
    });
    return new Set(friendships.map((friendship) => friendship.friendId));
  }
}
