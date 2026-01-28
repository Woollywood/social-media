import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class PaginationMetaDto {
  @ApiProperty({ type: 'number', minimum: 0 })
  @IsInt()
  @Min(0)
  total: number;

  @ApiProperty({ type: 'number', minimum: 1 })
  @IsInt()
  @Min(1)
  page: number;

  @ApiProperty({ type: 'number', minimum: 1 })
  @IsInt()
  @Min(1)
  limit: number;

  @ApiProperty({ type: 'number', minimum: 0 })
  @IsInt()
  @Min(0)
  pages: number;
}
