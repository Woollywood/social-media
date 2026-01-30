import { Injectable } from '@nestjs/common';

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

  async list(pagination: PaginationResult) {
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
      items,
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
      items,
      meta: buildPaginationMeta(total, pagination.page, pagination.limit),
    };
  }
}
