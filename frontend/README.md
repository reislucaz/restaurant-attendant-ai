# Frontend - Restaurant Attendant AI

Este é o frontend do projeto Restaurant Attendant AI, uma interface web para atendimento virtual de restaurante, permitindo ao usuário conversar com um atendente virtual e visualizar o cardápio.

## Tecnologias principais
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Instalação

```bash
cd frontend
npm install
```

## Rodando o projeto

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

## Scripts úteis
- `dev`: inicia o servidor de desenvolvimento
- `build`: gera a build de produção
- `start`: inicia o servidor em produção
- `lint`: executa o linter

## Estrutura de pastas
- `src/app/` - Páginas principais (chat, menu)
- `src/components/` - Componentes reutilizáveis
- `public/` - Assets públicos (imagens, ícones)

## Funcionalidades
- Chat com atendente virtual
- Visualização do cardápio por categoria (pizzas, bebidas, sobremesas)

## Configuração de API
Certifique-se de definir a variável de ambiente `NEXT_PUBLIC_API_URL` apontando para o backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Coloque este valor em um arquivo `.env.local` na raiz do frontend.
