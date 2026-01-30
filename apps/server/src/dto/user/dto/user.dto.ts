import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class UserDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
  @ApiProperty({
    type: 'string',
  })
  email: string;
  @ApiProperty({
    type: 'string',
  })
  username: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  avatarUrl: string | null;

  @ApiPropertyOptional({
    type: 'number',
    description: 'Count of mutual friends with current user.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  mutualFriendsCount?: number;
}
