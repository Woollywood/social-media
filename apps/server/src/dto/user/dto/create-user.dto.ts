import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  ConnectSessionDto,
  type ConnectSessionDto as ConnectSessionDtoAsType,
} from '../../session/dto/connect-session.dto';

export class CreateUserSessionsRelationInputDto {
  @ApiProperty({
    type: ConnectSessionDto,
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectSessionDto)
  connect: ConnectSessionDtoAsType[];
}

@ApiExtraModels(ConnectSessionDto, CreateUserSessionsRelationInputDto)
export class CreateUserDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  passwordHash: string;
  @ApiProperty({
    required: false,
    type: CreateUserSessionsRelationInputDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUserSessionsRelationInputDto)
  sessions?: CreateUserSessionsRelationInputDto;
}
