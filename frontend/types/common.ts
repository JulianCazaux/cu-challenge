export type CardType = {
  id: number;
  name: string;
  pokemonType: TypeEnum;
  evolutionType: EvolutionEnum;
  attack: AttackType;
  hitPoints: number;
  weakness: WeaknessType;
  resistance: ResistanceType;
  rarity: RarityEnum;
};

export type FindAllResponseType<T> = {
  count: number;
  items: T[];
};

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
