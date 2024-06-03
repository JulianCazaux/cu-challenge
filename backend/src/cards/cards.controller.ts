import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PaginateFilterCardsDto } from './dto/paginate-filter-cards.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    return await this.cardsService.create(createCardDto);
  }

  @Get()
  async findAll(@Query() query: PaginateFilterCardsDto) {
    const { limit = 10, offset = 0, name, type } = query;
    return await this.cardsService.findAll(+offset, +limit, name, type);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cardsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return await this.cardsService.update(+id, updateCardDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cardsService.remove(+id);
  }

  @Get('battle/:id')
  async battle(@Param('id') id: string, @Query('opponent') opponent: string) {
    const myCard = await this.cardsService.findOne(+id);
    const opponentCard = await this.cardsService.findOne(+opponent);

    let damageAmount = myCard.attack.damageAmount;

    if (
      opponentCard.weakness &&
      opponentCard.weakness.type === myCard.pokemonType
    ) {
      damageAmount *= opponentCard.weakness.times;
    }

    if (
      opponentCard.resistance &&
      opponentCard.resistance.type === myCard.pokemonType
    ) {
      damageAmount -= opponentCard.resistance.value;
    }

    return damageAmount >= opponentCard.hitPoints;
  }

  @Get('comparison/:id')
  async comparison(@Param('id') id: string) {
    const card = await this.cardsService.findOne(+id);

    if (card !== null) {
      const weakness = card.weakness
        ? await this.cardsService.findAllByType(card.weakness.type)
        : [];

      const resistance = card.resistance
        ? await this.cardsService.findAllByType(card.resistance.type)
        : [];

      return { weakness, resistance };
    }
  }
}
