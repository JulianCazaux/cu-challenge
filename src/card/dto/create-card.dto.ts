import {
  IsString,
  IsOptional,
  IsNumber,
  IsObject,
  IsEnum,
} from '@nestjs/class-validator';
import { $Enums } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export class CreateCardDto {
  @IsString()
  name: string;

  @IsEnum($Enums.TypeEnum)
  pokemonType: $Enums.TypeEnum;

  @IsEnum($Enums.EvolutionEnum)
  evolutionType: $Enums.EvolutionEnum;

  @IsObject({ each: true })
  attacks: JsonValue[];

  @IsNumber()
  hitPoints: number;

  @IsObject()
  weakness: JsonValue;

  @IsOptional()
  @IsObject()
  resistance: JsonValue;

  @IsEnum($Enums.RarityEnum)
  rarity: $Enums.RarityEnum;
}
