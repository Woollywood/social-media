import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { type RequestWithUser } from '../auth/types/request-with-user';
import { PaginationQueryDto } from '../dto/pagination/pagination-query.dto';
import { normalizePagination } from '../utils';

import { UsersListDto } from './dto/users-list.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get users list.' })
  @ApiQuery({ type: PaginationQueryDto })
  @ApiResponse({ status: 200, type: UsersListDto })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get()
  list(@Request() req: RequestWithUser, @Query() query: PaginationQueryDto) {
    const pagination = normalizePagination(query);
    return this.usersService.list(req.user.id, pagination);
  }
}
