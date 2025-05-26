import { IsString, IsNumber, IsEnum, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';

export class UpdateProductDto {
  @ApiProperty({ description: 'Nome do produto', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Descrição do produto', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Categoria do produto',
    enum: Category,
    required: false,
  })
  @IsEnum(Category)
  @IsOptional()
  category?: Category;

  @ApiProperty({ description: 'Preço do produto', required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;
}
