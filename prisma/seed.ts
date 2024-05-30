// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.card.create({
    data: {
      name: 'Pikachu',
      pokemonType: 'ELECTRIC',
      evolutionType: 'BASIC',
      attacks: [{ attackName: 'Meal Time', damageAmount: 0 }],
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
      attacks: [
        { attackName: 'Stoke', damageAmount: 0 },
        { attackName: 'Fire Blast', damageAmount: 120 },
      ],
      hitPoints: 180,
      weakness: { type: 'WATER', times: 2 },
      rarity: 'COMMON',
    },
  });

  await prisma.card.create({
    data: {
      name: 'ONIX',
      pokemonType: 'FIGHTING',
      evolutionType: 'BASIC',
      attacks: [
        { attackName: 'Slam', damageAmount: 20 },
        { attackName: 'Body Slam', damageAmount: 40 },
      ],
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
      attacks: [{ attackName: 'Giant Wave', damageAmount: 160 }],
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
      attacks: [{ attackName: 'Dig Claws', damageAmount: 20 }],
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
      attacks: [{ attackName: 'Special Blow', damageAmount: 60 }],
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
      attacks: [
        { attackName: 'Pound', damageAmount: 10 },
        { attackName: 'Shining Claws', damageAmount: 10 },
      ],
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
