import { ApiProperty } from '@nestjs/swagger';

import { NotificationType, Prisma } from '../../../../prisma/generated/client';

export class NotificationDto {
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
    enum: NotificationType,
    enumName: 'NotificationType',
  })
  type: NotificationType;
  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  payload: Prisma.JsonValue | null;
}
