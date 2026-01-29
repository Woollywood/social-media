import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'john_doe' })
  @IsString()
  username: string;
  @ApiProperty({ example: 'StrongPassword123!' })
  @IsString()
  @MinLength(8)
  password: string;
  @ApiProperty({ example: 'http://example.url.com' })
  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
