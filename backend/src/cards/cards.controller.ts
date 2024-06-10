import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PaginateFilterCardsDto } from './dto/paginate-filter-cards.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ParamsIdDto } from './dto/params-id-dto';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiCreatedResponse({
    description: 'The card has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request: Custom message per property type.',
  })
  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    return await this.cardsService.create(createCardDto);
  }

  @ApiOkResponse({ description: 'Succesful response.' })
  @ApiBadRequestResponse({
    description: 'Bad request: Custom message per property type.',
  })
  @Get()
  async findAll(@Query() query: PaginateFilterCardsDto) {
    const { limit = 10, offset = 0, name, type } = query;
    return await this.cardsService.findAll(offset, limit, name, type);
  }

  @ApiOkResponse({ description: 'Card was found succesfully.' })
  @ApiBadRequestResponse({
    description: 'Bad request: Custom message per property type.',
  })
  @ApiNotFoundResponse({ description: 'Card not found.' })
  @Get(':id')
  async findOne(@Param() params: ParamsIdDto) {
    const result = await this.cardsService.findOne(+params.id);
    if (!result) {
      throw new NotFoundException(`Card with id: ${params.id} does not exist.`);
    }
    return result;
  }

  @ApiOkResponse({ description: 'Card was succesfully updated.' })
  @ApiBadRequestResponse({
    description: 'Bad request: Custom message per property type.',
  })
  @ApiNotFoundResponse({ description: 'Card not found.' })
  @Patch(':id')
  async update(
    @Param() params: ParamsIdDto,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    let result;
    try {
      result = await this.cardsService.update(+params.id, updateCardDto);
      return result;
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException(error.meta.cause);
      else return error;
    }
  }

  @ApiOkResponse({ description: 'Card was succesfully removed.' })
  @ApiBadRequestResponse({
    description: 'Bad request: Custom message per property type.',
  })
  @ApiNotFoundResponse({ description: 'Card not found.' })
  @Delete(':id')
  async remove(@Param() params: ParamsIdDto) {
    let result;
    try {
      result = await this.cardsService.remove(+params.id);
      return result;
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException(error.meta.cause);
      else return error;
    }
  }

  @ApiOkResponse({
    description: 'TRUE if card defeats opponent. FALSE if not.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request: Custom message per property type.',
  })
  @ApiNotFoundResponse({ description: 'One of the cards was not found.' })
  @Get('battle/:id')
  async battle(
    @Param() params: ParamsIdDto,
    @Query('opponent') opponent: number,
  ) {
    if (+params.id === opponent) throw new BadRequestException();

    let myCard;
    let opponentCard;

    try {
      myCard = await this.cardsService.findOne(+params.id);
      opponentCard = await this.cardsService.findOne(opponent);
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException(error.meta.cause);
      else return error;
    }

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

  @ApiOkResponse({
    description:
      'Object with two props: "weakness" and "resistance" each one containing an array with the cards (the complete object) it is weak against and which it is resistant to',
  })
  @ApiBadRequestResponse({
    description: 'Bad request: Custom message per property type.',
  })
  @ApiNotFoundResponse({ description: 'Card not found.' })
  @Get('comparison/:id')
  async comparison(@Param() params: ParamsIdDto) {
    let card;
    try {
      card = await this.cardsService.findOne(+params.id);
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException(error.meta.cause);
      else return error;
    }

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
