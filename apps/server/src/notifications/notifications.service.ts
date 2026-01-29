import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { buildPaginationMeta, type PaginationResult } from '../utils';

import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async list(
    userId: string,
    pagination: PaginationResult,
    unreadOnly?: boolean,
  ) {
    const where = {
      recipientId: userId,
      ...(unreadOnly ? { readAt: null } : {}),
    };

    const [items, total] = await this.prismaService.$transaction([
      this.prismaService.notification.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prismaService.notification.count({ where }),
    ]);

    return {
      items,
      meta: buildPaginationMeta(total, pagination.page, pagination.limit),
    };
  }

  async markRead(userId: string, notificationId: string) {
    const notification = await this.prismaService.notification.findUnique({
      where: { id: notificationId },
      select: { id: true, recipientId: true },
    });
    if (!notification) {
      throw new NotFoundException('Notification not found.');
    }
    if (notification.recipientId !== userId) {
      throw new ForbiddenException('Cannot update this notification.');
    }

    await this.prismaService.notification.update({
      where: { id: notificationId },
      data: { readAt: new Date() },
    });

    this.notificationsGateway.emitToUser(userId, 'notifications:read', {
      id: notificationId,
    });

    return { success: true };
  }

  async markAllRead(userId: string) {
    const result = await this.prismaService.notification.updateMany({
      where: { recipientId: userId, readAt: null },
      data: { readAt: new Date() },
    });

    this.notificationsGateway.emitToUser(userId, 'notifications:read-all', {
      updated: result.count,
    });

    return { success: true, updated: result.count };
  }
}
