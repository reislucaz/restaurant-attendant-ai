# Restaurant Attendant AI

Este repositório contém uma solução completa para atendimento virtual de restaurante, composta por um backend (NestJS + Prisma) e um frontend (Next.js).

## Estrutura do projeto

- `backend/` — API REST para produtos, chats e mensagens, usando SQLite
- `frontend/` — Interface web para chat e visualização do cardápio
- `docker-compose.yml` — Orquestração dos serviços via Docker

## Como rodar com Docker Compose

1. **Configure as variáveis de ambiente**

Você pode criar um arquivo `.env` na raiz do projeto com as variáveis necessárias para o backend:

```env
API_KEY=sua_api_key
ANTHROPIC_API_KEY=sua_anthropic_key
```

2. **Suba os containers**

```bash
docker compose up --build
```

- O backend estará disponível em http://localhost:7001
- O frontend estará disponível em http://localhost:7000

> O frontend se comunica com o backend usando a variável `NEXT_PUBLIC_API_URL` já configurada no compose.

## Documentação detalhada

- [README do backend](./backend/README.md)
- [README do frontend](./frontend/README.md)

## Scripts úteis (alternativa ao Docker)

Você pode rodar cada parte manualmente seguindo as instruções nos READMEs de cada pasta.

---

Sinta-se à vontade para abrir issues ou contribuir! 