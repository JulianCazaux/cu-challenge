import {
  IsString,
  IsOptional,
  IsNumber,
  IsObject,
  IsEnum,
  IsNotEmpty,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { Min, ValidateNested } from 'class-validator';

class AttackTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1)
  damageAmount: number;
}

class WeaknessTypeDto {
  @IsEnum($Enums.TypeEnum)
  @ApiProperty({
    description: 'Pokemon Type',
    enum: $Enums.TypeEnum,
  })
  type: $Enums.TypeEnum;

  @IsNumber()
  @Min(1)
  times: number;
}

class ResistanceTypeDto {
  @IsEnum($Enums.TypeEnum)
  @ApiProperty({
    description: 'Pokemon Type',
    enum: $Enums.TypeEnum,
  })
  type: $Enums.TypeEnum;

  @IsNumber()
  @Min(1)
  value: number;
}

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum($Enums.TypeEnum)
  @ApiProperty({
    description: 'Pokemon Type',
    enum: $Enums.TypeEnum,
  })
  pokemonType: $Enums.TypeEnum;

  @IsEnum($Enums.EvolutionEnum)
  @ApiProperty({
    description: 'Pokemon Evolution Type',
    enum: $Enums.EvolutionEnum,
  })
  evolutionType: $Enums.EvolutionEnum;

  @IsNumber()
  @ApiProperty({
    description: 'Pokemon Hit Points',
  })
  hitPoints: number;

  @IsObject()
  @ValidateNested()
  attack: AttackTypeDto;

  @IsObject()
  @ValidateNested()
  weakness: WeaknessTypeDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  resistance: ResistanceTypeDto;

  @IsEnum($Enums.RarityEnum)
  @ApiProperty({
    description: 'Pokemon Rarity',
    enum: $Enums.RarityEnum,
  })
  rarity: $Enums.RarityEnum;
}
