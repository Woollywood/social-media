import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { type RequestWithUser } from '../auth/types/request-with-user';
import { normalizePagination } from '../utils';

import { NotificationReadDto } from './dto/notification-read.dto';
import { NotificationsReadAllDto } from './dto/notifications-read-all.dto';
import { NotificationsListDto } from './dto/notifications-list.dto';
import { NotificationsQueryDto } from './dto/notifications-query.dto';
import { NotificationsService } from './notifications.service';

@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiOperation({ summary: 'List notifications.' })
  @ApiQuery({ type: NotificationsQueryDto })
  @ApiResponse({ status: 200, type: NotificationsListDto })
  @Get()
  list(
    @Request() req: RequestWithUser,
    @Query() query: NotificationsQueryDto,
  ) {
    const pagination = normalizePagination(query);
    return this.notificationsService.list(
      req.user.id,
      pagination,
      query.unreadOnly,
    );
  }

  @ApiOperation({ summary: 'Mark notification as read.' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, type: NotificationReadDto })
  @Post(':id/read')
  markRead(
    @Request() req: RequestWithUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.notificationsService.markRead(req.user.id, id);
  }

  @ApiOperation({ summary: 'Mark all notifications as read.' })
  @ApiResponse({ status: 200, type: NotificationsReadAllDto })
  @Post('read-all')
  markAllRead(@Request() req: RequestWithUser) {
    return this.notificationsService.markAllRead(req.user.id);
  }
}
