import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { PaginationQueryDto } from '../../dto/pagination/pagination-query.dto';

import { FriendRequestDirection } from './friend-request-direction.enum';
import { FriendRequestStatus } from './friend-request-status.enum';

export class FriendRequestsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    enum: FriendRequestDirection,
    default: FriendRequestDirection.In,
    description: 'Request direction relative to current user.',
    enumName: 'FriendRequestDirection',
  })
  @IsOptional()
  @IsEnum(FriendRequestDirection)
  direction?: FriendRequestDirection;

  @ApiPropertyOptional({
    enum: FriendRequestStatus,
    default: FriendRequestStatus.Pending,
    description: 'Filter by request status.',
    enumName: 'FriendRequestStatus',
  })
  @IsOptional()
  @IsEnum(FriendRequestStatus)
  status?: FriendRequestStatus;
}
