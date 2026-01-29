import {
  Body,
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
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { type RequestWithUser } from '../auth/types/request-with-user';
import { PaginationQueryDto } from '../dto/pagination/pagination-query.dto';
import { normalizePagination } from '../utils';

import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { FriendRequestDto } from './dto/friend-request.dto';
import { FriendRequestsListDto } from './dto/friend-requests-list.dto';
import { FriendRequestsQueryDto } from './dto/friend-requests-query.dto';
import { FriendsListDto } from './dto/friends-list.dto';
import { FriendsService } from './friends.service';

@ApiTags('friends')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @ApiOperation({ summary: 'Send a friend request.' })
  @ApiBody({ type: CreateFriendRequestDto })
  @ApiResponse({ status: 201, type: FriendRequestDto })
  @Post('requests')
  sendRequest(
    @Request() req: RequestWithUser,
    @Body() body: CreateFriendRequestDto,
  ) {
    return this.friendsService.sendRequest(req.user.id, body.receiverId);
  }

  @ApiOperation({ summary: 'List friend requests.' })
  @ApiQuery({ type: FriendRequestsQueryDto })
  @ApiResponse({ status: 200, type: FriendRequestsListDto })
  @Get('requests')
  listRequests(
    @Request() req: RequestWithUser,
    @Query() query: FriendRequestsQueryDto,
  ) {
    const pagination = normalizePagination(query);
    return this.friendsService.listRequests(
      req.user.id,
      pagination,
      query.direction,
      query.status,
    );
  }

  @ApiOperation({ summary: 'Accept a friend request.' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, type: FriendRequestDto })
  @Post('requests/:id/accept')
  acceptRequest(
    @Request() req: RequestWithUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.friendsService.acceptRequest(req.user.id, id);
  }

  @ApiOperation({ summary: 'Decline a friend request.' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, type: FriendRequestDto })
  @Post('requests/:id/decline')
  declineRequest(
    @Request() req: RequestWithUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.friendsService.declineRequest(req.user.id, id);
  }

  @ApiOperation({ summary: 'Cancel a friend request.' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, type: FriendRequestDto })
  @Post('requests/:id/cancel')
  cancelRequest(
    @Request() req: RequestWithUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.friendsService.cancelRequest(req.user.id, id);
  }

  @ApiOperation({ summary: 'List friends.' })
  @ApiQuery({ type: PaginationQueryDto })
  @ApiResponse({ status: 200, type: FriendsListDto })
  @Get()
  listFriends(
    @Request() req: RequestWithUser,
    @Query() query: PaginationQueryDto,
  ) {
    const pagination = normalizePagination(query);
    return this.friendsService.listFriends(req.user.id, pagination);
  }
}
