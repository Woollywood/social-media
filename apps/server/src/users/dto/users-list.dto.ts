import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { PaginationMetaDto } from '../../dto/pagination/pagination-meta.dto';
import { UserDto } from '../../dto/user/dto/user.dto';

export class UsersListDto {
  @ApiProperty({ type: [UserDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  items: UserDto[];

  @ApiProperty({ type: PaginationMetaDto })
  @ValidateNested()
  @Type(() => PaginationMetaDto)
  meta: PaginationMetaDto;
}
