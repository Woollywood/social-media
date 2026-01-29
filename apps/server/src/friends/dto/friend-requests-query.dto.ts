import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { PaginationQueryDto } from '../../dto/pagination/pagination-query.dto';

import { FriendRequestDirection } from './friend-request-direction.enum';
import { FriendRequestStatus } from './friend-request-status.enum';

export class FriendRequestsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    enum: FriendRequestDirection,
    default: FriendRequestDirection.In,
  })
  @IsOptional()
  @IsEnum(FriendRequestDirection)
  direction?: FriendRequestDirection;

  @ApiPropertyOptional({
    enum: FriendRequestStatus,
    default: FriendRequestStatus.Pending,
  })
  @IsOptional()
  @IsEnum(FriendRequestStatus)
  status?: FriendRequestStatus;
}
