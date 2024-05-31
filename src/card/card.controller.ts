import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    return await this.cardService.create(createCardDto);
  }

  @Get()
  async findAll() {
    return await this.cardService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cardService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return await this.cardService.update(+id, updateCardDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cardService.remove(+id);
  }
}
