import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

import {
  ConnectUserDto,
  type ConnectUserDto as ConnectUserDtoAsType,
} from '../../user/dto/connect-user.dto';

export class CreateSessionUserRelationInputDto {
  @ApiProperty({
    type: ConnectUserDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ConnectUserDto)
  connect: ConnectUserDtoAsType;
}

@ApiExtraModels(ConnectUserDto, CreateSessionUserRelationInputDto)
export class CreateSessionDto {
  @ApiProperty({
    type: CreateSessionUserRelationInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateSessionUserRelationInputDto)
  user: CreateSessionUserRelationInputDto;
}
