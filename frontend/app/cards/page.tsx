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
import { type CardType, type FindAllResponseType } from '@/types/common';

export default async function Cards() {
  const data: FindAllResponseType<CardType> = await axios
    .get((process.env.NEXT_PUBLIC_BACKEND_URL as string) + '/cards')
    .then((res) => res.data);

  return (
    <main className="min-h-screen px-24 py-3">
      <h1 className="text-5xl font-bold">Pokemon App</h1>
      <div className="p-10">filters</div>
      <div className="flex items-start flex-wrap gap-2">
        {data &&
          data.items.map((card) => (
            <PokemonCard card={card} key={card.id}></PokemonCard>
          ))}
      </div>
    </main>
  );
}
