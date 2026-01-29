import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { PaginationMetaDto } from '../../dto/pagination/pagination-meta.dto';

import { NotificationDto } from './notification.dto';

export class NotificationsListDto {
  @ApiProperty({ type: [NotificationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NotificationDto)
  items: NotificationDto[];

  @ApiProperty({ type: PaginationMetaDto })
  @ValidateNested()
  @Type(() => PaginationMetaDto)
  meta: PaginationMetaDto;
}
