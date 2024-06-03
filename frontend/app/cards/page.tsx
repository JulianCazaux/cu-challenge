import axios from 'axios';
import {
  type TypeEnum,
  type EvolutionEnum,
  type RarityEnum,
  type AttackType,
  type WeaknessType,
  type ResistanceType,
} from '@/types/common';

import PokemonCard from '@/components/pokemon-card';

type CardType = {
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

type FindAllResponseType<T> = {
  count: number;
  items: T[];
};

export default async function Cards() {
  const data: FindAllResponseType<CardType> = await axios
    .get((process.env.NEXT_PUBLIC_BACKEND_URL as string) + '/cards')
    .then((res) => res.data);

  return (
    <main className=" min-h-screen p-24">
      <h1 className="text-3xl font-bold">Pokemon App</h1>
      <div className="p-10">filters</div>
      <div className="flex items-start flex-wrap gap-2">
        {data &&
          data.items.map((card) => <PokemonCard card={card}></PokemonCard>)}
      </div>
    </main>
  );
}
