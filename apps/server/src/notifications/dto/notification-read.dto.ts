import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class NotificationReadDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  success: boolean;
}
