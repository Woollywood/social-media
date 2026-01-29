import { FriendRequestStatus } from '../../../../prisma/generated/client';
import { ApiProperty } from '@nestjs/swagger';

export class FriendRequestDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  respondedAt: Date | null;
  @ApiProperty({
    enum: FriendRequestStatus,
    enumName: 'FriendRequestStatus',
  })
  status: FriendRequestStatus;
}
