import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsObject, IsOptional, IsUUID } from 'class-validator';

import { NotificationType } from './notification-type.enum';

export class NotificationDto {
  @ApiProperty({
    example: '16c52df6-2c82-4692-981a-746b44a1979f',
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
  readAt?: Date | null;

  @ApiProperty({
    example: '3b19d11d-6a06-4c5a-b2e5-2bbff10c80e4',
  })
  @IsUUID()
  recipientId: string;

  @ApiProperty({ enum: NotificationType })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiPropertyOptional({
    type: Object,
    description: 'Notification payload for UI routing.',
  })
  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown> | null;
}
