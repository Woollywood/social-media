import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { PaginationMetaDto } from '../../dto/pagination/pagination-meta.dto';

import { FriendshipDto } from './friendship.dto';

export class FriendsListDto {
  @ApiProperty({ type: [FriendshipDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FriendshipDto)
  items: FriendshipDto[];

  @ApiProperty({ type: PaginationMetaDto })
  @ValidateNested()
  @Type(() => PaginationMetaDto)
  meta: PaginationMetaDto;
}
