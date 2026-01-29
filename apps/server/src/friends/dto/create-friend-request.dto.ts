import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateFriendRequestDto {
  @ApiProperty({
    example: '3b19d11d-6a06-4c5a-b2e5-2bbff10c80e4',
    description: 'User id to send the friend request to.',
  })
  @IsUUID()
  receiverId: string;
}
