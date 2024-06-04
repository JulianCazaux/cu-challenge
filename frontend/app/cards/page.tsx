import { type CardType, type FindAllResponseType } from '@/types/common';
import PokemonFilter from '@/components/pokemon-filter';
import PokemonGrid from '@/components/pokemon-grid';
import { Suspense } from 'react';

export default async function Cards({
  searchParams,
}: {
  searchParams?: {
    offset?: string;
    limit?: string;
    name?: string;
    type?: string;
  };
}) {
  const nameQuery = searchParams?.name || '';
  const typeQuery = searchParams?.type || '';
  const limitQuery = searchParams?.limit || '';
  const offsetQuery = searchParams?.offset || '';

  return (
    <main className="min-h-screen px-24 py-3">
      <h1 className="text-5xl font-bold">Pokemon App</h1>
      <PokemonFilter />
      <Suspense key={nameQuery + typeQuery}>
        <PokemonGrid
          nameQuery={nameQuery}
          typeQuery={typeQuery}
          limitQuery={limitQuery}
          offsetQuery={offsetQuery}
        />
      </Suspense>
    </main>
  );
}
