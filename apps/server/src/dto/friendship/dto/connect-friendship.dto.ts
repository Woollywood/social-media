import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class FriendshipUserIdFriendIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  friendId: string;
}

@ApiExtraModels(FriendshipUserIdFriendIdUniqueInputDto)
export class ConnectFriendshipDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  id?: string;
  @ApiProperty({
    type: FriendshipUserIdFriendIdUniqueInputDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => FriendshipUserIdFriendIdUniqueInputDto)
  userId_friendId?: FriendshipUserIdFriendIdUniqueInputDto;
}
