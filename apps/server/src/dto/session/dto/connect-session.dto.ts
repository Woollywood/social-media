import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsOptional, IsString, IsUUID } from 'class-validator';

export class ConnectSessionDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  id?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsJWT()
  accessToken?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsJWT()
  refreshToken?: string;
}
