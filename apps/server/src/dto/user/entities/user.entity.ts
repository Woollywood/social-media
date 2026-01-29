import { ApiProperty } from '@nestjs/swagger';

import {
  FriendRequest,
  type FriendRequest as FriendRequestAsType,
} from '../../friendRequest/entities/friendRequest.entity';
import {
  Friendship,
  type Friendship as FriendshipAsType,
} from '../../friendship/entities/friendship.entity';
import {
  Notification,
  type Notification as NotificationAsType,
} from '../../notification/entities/notification.entity';
import {
  Session,
  type Session as SessionAsType,
} from '../../session/entities/session.entity';

export class User {
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
  })
  updatedAt: Date;
  @ApiProperty({
    type: 'string',
  })
  email: string;
  @ApiProperty({
    type: 'string',
  })
  username: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  avatarUrl: string | null;
  @ApiProperty({
    type: () => Session,
    isArray: true,
    required: false,
  })
  sessions?: SessionAsType[];
  @ApiProperty({
    type: () => FriendRequest,
    isArray: true,
    required: false,
  })
  friendRequestsSent?: FriendRequestAsType[];
  @ApiProperty({
    type: () => FriendRequest,
    isArray: true,
    required: false,
  })
  friendRequestsReceived?: FriendRequestAsType[];
  @ApiProperty({
    type: () => Friendship,
    isArray: true,
    required: false,
  })
  friendships?: FriendshipAsType[];
  @ApiProperty({
    type: () => Friendship,
    isArray: true,
    required: false,
  })
  friendsOf?: FriendshipAsType[];
  @ApiProperty({
    type: () => Notification,
    isArray: true,
    required: false,
  })
  notifications?: NotificationAsType[];
}
