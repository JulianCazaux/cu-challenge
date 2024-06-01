import {
  IsNumber,
  Min,
  IsOptional,
  IsString,
  IsEnum,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

export class PaginateFilterCardsDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    required: false,
    type: 'number',
    minimum: 0,
    default: 0,
  })
  offset?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    required: false,
    type: 'number',
    minimum: 1,
    default: 10,
  })
  limit?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: 'string',
  })
  name?: string;

  @IsOptional()
  @IsEnum($Enums.TypeEnum)
  @ApiProperty({
    required: false,
    enum: $Enums.TypeEnum,
  })
  type?: $Enums.TypeEnum;
}
