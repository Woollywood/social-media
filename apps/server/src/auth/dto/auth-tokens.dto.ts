import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class AuthTokensDto {
  @ApiProperty({
    description: 'Access token for protected routes.',
  })
  @IsJWT()
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token for token rotation.',
  })
  @IsJWT()
  refreshToken: string;
}
