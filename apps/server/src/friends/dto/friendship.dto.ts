import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { UserDto } from '../../dto/user/dto/user.dto';

export class FriendshipDto {
  @ApiProperty({
    example: 'd8b6bff3-5fcb-4fb9-8a8b-46d8457cfcad',
  })
  id: string;

  @ApiProperty({
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({ type: UserDto })
  @ValidateNested()
  @Type(() => UserDto)
  friend: UserDto;
}
