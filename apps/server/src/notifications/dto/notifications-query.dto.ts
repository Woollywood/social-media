import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

import { PaginationQueryDto } from '../../dto/pagination/pagination-query.dto';

const toBoolean = (value: unknown) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return false;
};

export class NotificationsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Return only unread notifications.',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => toBoolean(value))
  unreadOnly?: boolean;
}
