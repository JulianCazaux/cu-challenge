export enum TypeEnum {
  FIRE,
  WATER,
  GRASS,
  ELECTRIC,
  PSYCHIC,
  FIGHTING,
  COLORLESS,
  METAL,
  DARK,
  DRAGON,
  FAIRY,
}

export enum EvolutionEnum {
  BASIC,
  STAGE1,
  STAGE2,
}

export enum RarityEnum {
  COMMON,
  UNCOMMON,
  RARE,
}

export type AttackType = { name: string; damageAmount: number };

export type WeaknessType = { type: TypeEnum; times: number };

export type ResistanceType = { type: TypeEnum; value: number };
