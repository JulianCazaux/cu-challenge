import {
  IsString,
  IsOptional,
  IsNumber,
  IsObject,
  IsEnum,
} from '@nestjs/class-validator';
import { $Enums } from '@prisma/client';

export class CreateCardDto {
  @IsString()
  name: string;

  @IsEnum($Enums.TypeEnum)
  pokemonType: $Enums.TypeEnum;

  @IsEnum($Enums.EvolutionEnum)
  evolutionType: $Enums.EvolutionEnum;

  @IsObject()
  attack: PrismaJson.AttackType;

  @IsNumber()
  hitPoints: number;

  @IsObject()
  weakness: PrismaJson.WeaknessType;

  @IsOptional()
  @IsObject()
  resistance: PrismaJson.ResistanceType;

  @IsEnum($Enums.RarityEnum)
  rarity: $Enums.RarityEnum;
}
