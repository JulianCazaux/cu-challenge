import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from '../prisma/prisma.service';
import { $Enums } from '@prisma/client';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCardDto: CreateCardDto) {
    return this.prisma.card.create({ data: createCardDto });
  }

  async findAll(
    offset?: number,
    limit?: number,
    name?: string,
    type?: $Enums.TypeEnum,
  ) {
    const [count, items] = await this.prisma.$transaction([
      this.prisma.card.count({
        where: { ...(name && { name }), ...(type && { type }) },
      }),
      this.prisma.card.findMany({
        take: limit,
        skip: offset,
        ...((name || type) && {
          where: { ...(name && { name }), ...(type && { pokemonType: type }) },
        }),
      }),
    ]);

    return {
      count,
      items,
    };
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

  async findAllByType(type: $Enums.TypeEnum) {
    return this.prisma.card.findMany({ where: { pokemonType: type } });
  }
}
