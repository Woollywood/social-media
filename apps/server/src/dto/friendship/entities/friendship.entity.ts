import { ApiProperty } from '@nestjs/swagger';

import {
  FriendRequest,
  type FriendRequest as FriendRequestAsType,
} from '../../friendRequest/entities/friendRequest.entity';
import { User, type User as UserAsType } from '../../user/entities/user.entity';

export class Friendship {
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
  })
  userId: string;
  @ApiProperty({
    type: 'string',
  })
  friendId: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  sourceRequestId: string | null;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  user?: UserAsType;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  friend?: UserAsType;
  @ApiProperty({
    type: () => FriendRequest,
    required: false,
    nullable: true,
  })
  sourceRequest?: FriendRequestAsType | null;
}
