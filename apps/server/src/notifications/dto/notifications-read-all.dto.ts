import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, Min } from 'class-validator';

export class NotificationsReadAllDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  success: boolean;

  @ApiProperty({
    description: 'Number of notifications updated.',
    example: 3,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  updated: number;
}
