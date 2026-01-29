import { NotificationType, Prisma } from '../../../../prisma/generated/client';
import { ApiProperty } from '@nestjs/swagger';
import { User, type User as UserAsType } from '../../user/entities/user.entity';

export class Notification {
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
  readAt: Date | null;
  @ApiProperty({
    type: 'string',
  })
  recipientId: string;
  @ApiProperty({
    enum: NotificationType,
    enumName: 'NotificationType',
  })
  type: NotificationType;
  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  payload: Prisma.JsonValue | null;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  recipient?: UserAsType;
}
