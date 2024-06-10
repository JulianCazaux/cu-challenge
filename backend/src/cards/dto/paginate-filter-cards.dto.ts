import {
  IsNumber,
  Min,
  IsOptional,
  IsString,
  IsEnum,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class PaginateFilterCardsDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  offset?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum($Enums.TypeEnum) // TODO: customize validation message
  @ApiProperty({
    description: 'Pokemon Type',
    enum: $Enums.TypeEnum,
  })
  type?: $Enums.TypeEnum;
}
