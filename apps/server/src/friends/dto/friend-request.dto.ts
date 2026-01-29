import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

import { FriendRequestStatus } from './friend-request-status.enum';

export class FriendRequestDto {
  @ApiProperty({
    example: '5cd5a7b5-0ad7-4e6b-82c6-5f7e5ed7d8f3',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    format: 'date-time',
  })
  createdAt: Date;

  @ApiPropertyOptional({
    format: 'date-time',
  })
  @IsOptional()
  respondedAt?: Date | null;

  @ApiProperty({ enum: FriendRequestStatus })
  @IsEnum(FriendRequestStatus)
  status: FriendRequestStatus;

  @ApiProperty({
    example: '3b19d11d-6a06-4c5a-b2e5-2bbff10c80e4',
  })
  @IsUUID()
  requesterId: string;

  @ApiProperty({
    example: 'bb0e686d-5ac7-4d98-8b08-8f4c51b3b961',
  })
  @IsUUID()
  receiverId: string;
}
