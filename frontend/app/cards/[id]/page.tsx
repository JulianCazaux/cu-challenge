import BackButton from '@/components/back-button';
import PokemonBattle from '@/components/pokemon-battle';
import PokemonCard from '@/components/pokemon-card';
import axios from 'axios';

export default async function ViewCard({ params }: { params: { id: string } }) {
  const result = await axios
    .get(
      (process.env.NEXT_PUBLIC_BACKEND_URL as string) + '/cards/' + params.id,
    )
    .then((res) => res.data);

  return (
    <main className="min-h-screen px-24 py-3">
      <h1 className="text-5xl font-bold">
        {result.name} :: Battle simulation (Fight!)
      </h1>
      <div className="mt-5">
        <BackButton>Go back</BackButton>
      </div>
      <div className="pt-10 pb-5 flex justify-center gap-4">
        <div>
          <PokemonCard card={result} />
        </div>
        <div className="text-5xl content-center font-extrabold">VS</div>
        <div className="w-1/2 flex">
          <PokemonBattle pokemonId={params.id} pokemonName={result.name} />
        </div>
      </div>
    </main>
  );
}
