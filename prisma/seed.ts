// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.card.create({
    data: {
      name: 'Pikachu',
      pokemonType: 'ELECTRIC',
      evolutionType: 'BASIC',
      attack: { name: 'Gnaw', damageAmount: 20 },
      hitPoints: 60,
      weakness: { type: 'FIGHTING', times: 2 },
      resistance: { type: 'METAL', value: 20 },
      rarity: 'COMMON',
    },
  });

  await prisma.card.create({
    data: {
      name: 'Charizard',
      pokemonType: 'FIRE',
      evolutionType: 'BASIC',
      attack: { name: 'Fire Blast', damageAmount: 120 },
      hitPoints: 180,
      weakness: { type: 'WATER', times: 2 },
      rarity: 'COMMON',
    },
  });

  await prisma.card.create({
    data: {
      name: 'Onix',
      pokemonType: 'FIGHTING',
      evolutionType: 'BASIC',
      attack: { name: 'Body Slam', damageAmount: 40 },
      hitPoints: 90,
      weakness: { type: 'GRASS', times: 1 },
      rarity: 'COMMON',
    },
  });

  await prisma.card.create({
    data: {
      name: 'Feraligatr',
      pokemonType: 'WATER',
      evolutionType: 'STAGE2',
      attack: { name: 'Giant Wave', damageAmount: 160 },
      hitPoints: 180,
      weakness: { type: 'ELECTRIC', times: 2 },
      rarity: 'RARE',
    },
  });

  await prisma.card.create({
    data: {
      name: 'Sneazel',
      pokemonType: 'DARK',
      evolutionType: 'BASIC',
      attack: { name: 'Dig Claws', damageAmount: 20 },
      hitPoints: 70,
      weakness: { type: 'GRASS', times: 2 },
      rarity: 'COMMON',
    },
  });

  await prisma.card.create({
    data: {
      name: 'Scizor',
      pokemonType: 'METAL',
      evolutionType: 'STAGE1',
      attack: { name: 'Special Blow', damageAmount: 60 },
      hitPoints: 120,
      weakness: { type: 'FIRE', times: 2 },
      resistance: { type: 'PSYCHIC', value: 20 },
      rarity: 'RARE',
    },
  });

  await prisma.card.create({
    data: {
      name: 'Treecko',
      pokemonType: 'PSYCHIC',
      evolutionType: 'BASIC',
      attack: { name: 'Shining Claws', damageAmount: 10 },
      hitPoints: 40,
      weakness: { type: 'FIRE', times: 1 },
      resistance: { type: 'WATER', value: 30 },
      rarity: 'COMMON',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
