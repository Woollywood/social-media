import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsUUID } from 'class-validator';

export class AuthUserDto {
  @ApiProperty({ example: '3b19d11d-6a06-4c5a-b2e5-2bbff10c80e4' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;
}
