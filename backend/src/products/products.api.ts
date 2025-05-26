import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from './dto';

export const ApiGetProducts = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Listar todos os produtos' }),
    ApiResponse({
      status: 200,
      description: 'Lista de produtos retornada com sucesso',
      type: [CreateProductDto],
    }),
  );
};

export const ApiGetProduct = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Buscar produto por ID' }),
    ApiParam({ name: 'id', type: 'number' }),
    ApiResponse({
      status: 200,
      description: 'Produto encontrado com sucesso',
      type: CreateProductDto,
    }),
    ApiResponse({ status: 404, description: 'Produto não encontrado' }),
  );
};

export const ApiCreateProduct = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Criar novo produto' }),
    ApiResponse({
      status: 201,
      description: 'Produto criado com sucesso',
      type: CreateProductDto,
    }),
  );
};

export const ApiUpdateProduct = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Atualizar produto' }),
    ApiParam({ name: 'id', type: 'number' }),
    ApiResponse({
      status: 200,
      description: 'Produto atualizado com sucesso',
      type: UpdateProductDto,
    }),
    ApiResponse({ status: 404, description: 'Produto não encontrado' }),
  );
};

export const ApiDeleteProduct = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Deletar produto' }),
    ApiParam({ name: 'id', type: 'number' }),
    ApiResponse({
      status: 200,
      description: 'Produto deletado com sucesso',
      type: CreateProductDto,
    }),
    ApiResponse({ status: 404, description: 'Produto não encontrado' }),
  );
};
