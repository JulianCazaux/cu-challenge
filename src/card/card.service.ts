import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CardService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCardDto: CreateCardDto) {
    return this.prisma.card.create({ data: createCardDto });
  }

  async findAll() {
    return this.prisma.card.findMany();
  }

  async findOne(id: number) {
    return this.prisma.card.findUnique({ where: { id } });
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    return this.prisma.card.update({ where: { id }, data: updateCardDto });
  }

  async remove(id: number) {
    return this.prisma.card.delete({ where: { id } });
  }
}
