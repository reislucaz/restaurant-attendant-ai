import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product, Category } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.product.findMany({
        select: {
          id: true,
          name: true,
          category: true,
          price: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Falha ao buscar todos os produtos',
        error?.message ?? 'Unknown error',
      );
    }
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    return product;
  }

  async create(data: {
    name: string;
    description?: string;
    category: Category;
    price: number;
  }): Promise<Product> {
    try {
      return await this.prisma.product.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Falha ao criar o produto`,
        error?.message ?? 'Unknown error',
      );
    }
  }

  async update(
    id: number,
    data: {
      name?: string;
      description?: string;
      category?: Category;
      price?: number;
    },
  ): Promise<Product> {
    try {
      return await this.prisma.product.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Falha ao atualizar o produto ${id}`,
        error?.message ?? 'Unknown error',
      );
    }
  }

  async remove(id: number): Promise<Product> {
    try {
      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Falha ao deletar o produto ${id}`,
        error?.message ?? 'Unknown error',
      );
    }
  }
}
