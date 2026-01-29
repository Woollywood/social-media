import { FriendRequestStatus } from '../../../../prisma/generated/client';
import { ApiProperty } from '@nestjs/swagger';
import { User, type User as UserAsType } from '../../user/entities/user.entity';
import {
  Friendship,
  type Friendship as FriendshipAsType,
} from '../../friendship/entities/friendship.entity';

export class FriendRequest {
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
  @ApiProperty({
    type: 'string',
  })
  requesterId: string;
  @ApiProperty({
    type: 'string',
  })
  receiverId: string;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  requester?: UserAsType;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  receiver?: UserAsType;
  @ApiProperty({
    type: () => Friendship,
    isArray: true,
    required: false,
  })
  friendships?: FriendshipAsType[];
}
