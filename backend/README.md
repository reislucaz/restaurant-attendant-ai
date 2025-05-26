# Backend - Restaurant Attendant AI

Este é o backend do projeto Restaurant Attendant AI, responsável por gerenciar produtos, chats e mensagens do atendimento virtual de um restaurante.

## Tecnologias principais
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/)
- [TypeScript](https://www.typescriptlang.org/)

## Instalação

```bash
cd backend
npm install
```

## Rodando o projeto

### Desenvolvimento
```bash
npm run start:dev
```

### Produção
```bash
npm run build
npm run start:prod
```

## Banco de dados
O projeto utiliza SQLite por padrão. O schema está em `prisma/schema.prisma`.

### Rodar migrações
```bash
npx prisma migrate dev
```

### Popular banco com dados de exemplo
```bash
npx prisma db seed
```

## Scripts úteis
- `start:dev`: inicia o servidor em modo desenvolvimento
- `start:prod`: inicia o servidor em produção
- `test`: executa os testes
- `lint`: executa o linter

## Estrutura de pastas
- `src/` - Código-fonte principal
- `prisma/` - Schema e seed do banco de dados

## Modelos principais

- **Product**: Produtos do cardápio (pizza, bebida, sobremesa)
- **Chat**: Conversas iniciadas pelos usuários
- **Message**: Mensagens trocadas no chat

Veja o arquivo `prisma/schema.prisma` para detalhes dos campos.

## Documentação da API
Se disponível, acesse `/api` ou `/docs` após rodar o servidor para visualizar a documentação Swagger.
