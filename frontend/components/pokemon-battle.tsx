'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CardType, FindAllResponseType } from '@/types/common';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PokemonCard from './pokemon-card';
import { Button } from './ui/button';

export default function PokemonBattle({
  pokemonId,
  pokemonName,
}: {
  pokemonId: string;
  pokemonName: string;
}) {
  const [pokemonList, setPokemonList] =
    useState<FindAllResponseType<CardType>>();
  const [opponentId, setOpponentId] = useState('');
  const [opponentCard, setOpponentCard] = useState<CardType>();
  const [battleResultMessage, setBattleResultMessage] = useState('');

  useEffect(() => {
    axios
      .get((process.env.NEXT_PUBLIC_BACKEND_URL as string) + '/cards')
      .then((res) =>
        setPokemonList({
          ...res.data,
          items: res.data.items.filter(
            (el: CardType) => String(el.id) !== pokemonId,
          ),
        }),
      );
  }, []);

  useEffect(() => {
    if (opponentId !== '') {
      axios
        .get(
          (process.env.NEXT_PUBLIC_BACKEND_URL as string) +
            '/cards/' +
            opponentId,
        )
        .then((res) => setOpponentCard(res.data));
    } else {
      setOpponentCard(undefined);
    }
  }, [opponentId]);

  function showBattleResultMessage(pokemonWins: boolean) {
    return pokemonWins
      ? setBattleResultMessage(`${pokemonName} WINS !`)
      : setBattleResultMessage(`${pokemonName} LOOSES`);
  }

  async function battleSimulation() {
    await axios
      .get(
        (process.env.NEXT_PUBLIC_BACKEND_URL as string) +
          '/cards/battle/' +
          pokemonId,
        {
          params: { opponent: opponentId },
        },
      )
      .then((res) => showBattleResultMessage(res.data as boolean));
  }

  return (
    <>
      {opponentCard ? (
        <div className="flex gap-5 self-stretch">
          <PokemonCard card={opponentCard} />
          <div className="flex flex-col gap-5 justify-center w-1/4">
            {battleResultMessage !== '' && (
              <h1 className="text-5xl font-extrabold text-rose-600">
                {battleResultMessage}
              </h1>
            )}
            <Button
              variant={'outline'}
              className=""
              onClick={() => {
                setBattleResultMessage('');
                setOpponentId('');
              }}
            >
              Change opponent
            </Button>
            <Button variant={'destructive'} onClick={() => battleSimulation()}>
              FIGHT!
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center">
          <Select
            name="opponentSelect"
            onValueChange={(value) => setOpponentId(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select opponent" />
            </SelectTrigger>
            <SelectContent>
              {pokemonList &&
                pokemonList.items.map((pokemon, index) => (
                  <SelectItem value={String(pokemon.id)} key={index}>
                    {pokemon.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
}
