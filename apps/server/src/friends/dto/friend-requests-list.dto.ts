import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { PaginationMetaDto } from '../../dto/pagination/pagination-meta.dto';

import { FriendRequestDto } from './friend-request.dto';

export class FriendRequestsListDto {
  @ApiProperty({ type: [FriendRequestDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FriendRequestDto)
  items: FriendRequestDto[];

  @ApiProperty({ type: PaginationMetaDto })
  @ValidateNested()
  @Type(() => PaginationMetaDto)
  meta: PaginationMetaDto;
}
