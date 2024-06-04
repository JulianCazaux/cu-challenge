import { CardType, FindAllResponseType } from '@/types/common';
import PokemonCard from './pokemon-card';
import axios from 'axios';

export default async function PokemonGrid({
  nameQuery,
  typeQuery,
  limitQuery,
  offsetQuery,
}: {
  nameQuery: string;
  typeQuery: string;
  limitQuery: string;
  offsetQuery: string;
}) {
  const getAllResults: FindAllResponseType<CardType> = await axios
    .get((process.env.NEXT_PUBLIC_BACKEND_URL as string) + '/cards', {
      params: {
        ...(nameQuery && { name: nameQuery }),
        ...(typeQuery && { type: typeQuery }),
        ...(limitQuery && { limit: limitQuery }),
        ...(offsetQuery && { offset: offsetQuery }),
      },
    })
    .then((res) => res.data);

  return (
    <div className="flex items-start flex-wrap gap-2">
      {getAllResults &&
        getAllResults.items.map((card) => (
          <PokemonCard card={card} key={card.id}></PokemonCard>
        ))}
    </div>
  );
}
