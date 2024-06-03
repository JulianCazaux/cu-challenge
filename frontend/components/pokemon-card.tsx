import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import Image from 'next/image';
import { CardType } from '@/types/common';

export default function PokemonCard({ card }: { card: CardType }) {
  return (
    <Card key={card.id} className="self-stretch">
      <CardHeader>
        <CardTitle className="flex justify-between content-center">
          <span className="text-3xl">{card.name}</span>
          <span>
            <small>HP</small> <span className="text-3xl">{card.hitPoints}</span>
          </span>
        </CardTitle>
        <CardDescription className="flex justify-between"></CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={`https://img.pokemondb.net/artwork/${card.name.toLowerCase()}.jpg`}
          alt={card.name}
          width={300}
          height={300}
          className="w-full h-auto"
        ></Image>
        <div className="flex flex-col pt-7">
          <Badge
            className="w-full flex justify-between h-8"
            variant={'secondary'}
          >
            TYPE
            <span className="font-bold text-justify">{card.pokemonType}</span>
          </Badge>
          <Badge
            className="w-full flex justify-between mt-2 pr-2"
            variant={'secondary'}
          >
            <span className="">{card.attack.name.toUpperCase()}</span>
            <Badge variant={'destructive'}>{card.attack.damageAmount}</Badge>
          </Badge>
          <Badge
            className="w-full flex justify-between mt-2 h-8"
            variant={'secondary'}
          >
            {`WEAKNESS`}
            <span className="font-bold text-justify">
              {card.weakness.type} x {card.weakness.times}
            </span>
          </Badge>
          <Badge
            className="w-full flex justify-between mt-2 h-8"
            variant={'secondary'}
          >
            {`RESISTANCE`}
            {card.resistance && (
              <span className="font-bold text-justify">
                {card.resistance.type} x {card.resistance.value}
              </span>
            )}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs">{card.rarity}</p>
        <Button variant="default">View</Button>
      </CardFooter>
    </Card>
  );
}
