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

export default function PokemonCard({ card }) {
  return (
    <Card key={card.id} className="self-stretch">
      <CardHeader>
        <CardTitle>{card.name}</CardTitle>
        <CardDescription className="flex justify-between">
          <span>
            HP <span className="text-2xl">{card.hitPoints}</span>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={`https://img.pokemondb.net/artwork/${card.name.toLowerCase()}.jpg`}
          alt={card.name}
          width={300}
          height={300}
        ></Image>
        <div className="flex flex-col pt-7">
          <Badge className="w-full flex justify-between" variant={'secondary'}>
            TYPE
            <span className="font-bold text-justify">{card.pokemonType}</span>
          </Badge>
          <Badge
            className="w-full flex justify-between mt-2"
            variant={'secondary'}
          >
            <span className="text-2xl">{card.attack.name}</span>
            <span className="text-2xl font-bold text-justify">
              {card.attack.damageAmount}
            </span>
          </Badge>
          <Badge
            className="w-full flex justify-between mt-2"
            variant={'secondary'}
          >
            {`WEAKNESS`}
            <span className="font-bold text-justify">
              {card.weakness.type} x {card.weakness.times}
            </span>
          </Badge>
          {card.resistance && (
            <Badge
              className="w-full flex justify-between mt-2"
              variant={'secondary'}
            >
              {`RESISTANCE`}
              <span className="font-bold text-justify">
                {card.resistance.type} x {card.resistance.value}
              </span>
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">View</Button>
        <p className="text-xs">{card.rarity}</p>
      </CardFooter>
    </Card>
  );
}
