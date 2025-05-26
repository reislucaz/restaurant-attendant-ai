# Etapa de build
FROM node:20-alpine AS builder
WORKDIR /app

# Copia apenas os arquivos de dependências
COPY package.json package-lock.json ./

# Instala dependências de desenvolvimento
RUN npm ci

# Copia o restante do código
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Faz o build do projeto
RUN npm run build

# Etapa de produção
FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache openssl

# Cria usuário não-root
RUN addgroup -S app && adduser -S -G app app

# Copia apenas os arquivos necessários para produção
COPY package.json package-lock.json ./

# Instala apenas as dependências de produção
RUN npm ci --only=production

# Copia o build e o Prisma Client da etapa de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

USER app
ENV NODE_ENV=production

ARG API_KEY
ARG ANTHROPIC_API_KEY
ENV API_KEY=${API_KEY} \
    ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}

EXPOSE 3001

CMD ["node", "dist/src/main.js"]