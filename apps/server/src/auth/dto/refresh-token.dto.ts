import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token issued during login or refresh.',
  })
  @IsString()
  @MinLength(16)
  refreshToken: string;
}
