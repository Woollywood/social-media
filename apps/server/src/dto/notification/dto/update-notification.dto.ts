import { NotificationType, Prisma } from '../../../../prisma/generated/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';

export class UpdateNotificationDto {
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  readAt?: Date | null;
  @ApiProperty({
    enum: NotificationType,
    enumName: 'NotificationType',
    required: false,
  })
  @IsOptional()
  @IsEnum(NotificationType)
  type?: NotificationType;
  @ApiProperty({
    type: () => Object,
    required: false,
    nullable: true,
  })
  @IsOptional()
  payload?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
}
