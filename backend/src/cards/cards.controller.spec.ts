import { Test, TestingModule } from '@nestjs/testing';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';

const cardId = 345;

describe('CardsController', () => {
  let controller: CardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        {
          provide: CardsService,
          useValue: {
            create: jest
              .fn<Promise<CreateCardDto & { id: number }>, [CreateCardDto]>()
              .mockImplementation((cardDto) =>
                Promise.resolve({ id: cardId, ...cardDto }),
              ),
            findOne: jest
              .fn<Promise<CreateCardDto & { id: number }>, [number]>()
              .mockImplementation((id) =>
                Promise.resolve({
                  id,
                  name: 'Test SuperPokemon',
                  pokemonType: 'DARK',
                  evolutionType: 'STAGE1',
                  attack: { name: 'Great attack', damageAmount: 50 },
                  hitPoints: 70,
                  weakness: { type: 'COLORLESS', times: 2 },
                  resistance: { type: 'GRASS', value: 90 },
                  rarity: 'RARE',
                }),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<CardsController>(CardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create card', () => {
    it('should create a new card', async () => {
      const newCardDto: CreateCardDto = {
        name: 'Test SuperPokemon',
        pokemonType: 'DARK',
        evolutionType: 'STAGE1',
        attack: { name: 'Great attack', damageAmount: 50 },
        hitPoints: 70,
        weakness: { type: 'COLORLESS', times: 2 },
        resistance: { type: 'GRASS', value: 90 },
        rarity: 'RARE',
      };

      await expect(controller.create(newCardDto)).resolves.toEqual({
        id: cardId,
        ...newCardDto,
      });
    });

    describe('get card by id', () => {
      it('should get a single card', async () => {
        await expect(controller.findOne('15')).resolves.toEqual({
          id: 15,
          name: 'Test SuperPokemon',
          pokemonType: 'DARK',
          evolutionType: 'STAGE1',
          attack: { name: 'Great attack', damageAmount: 50 },
          hitPoints: 70,
          weakness: { type: 'COLORLESS', times: 2 },
          resistance: { type: 'GRASS', value: 90 },
          rarity: 'RARE',
        });
      });
    });
  });
});
