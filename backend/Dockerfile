# Etapa de build
FROM node:23.4.0-slim AS builder
WORKDIR /app

# instalar dependências
RUN apt-get update -y && apt-get install -y openssl
COPY package.json package-lock.json ./
RUN npm ci

# copiar código e gerar client
COPY . .
ENV DATABASE_URL=${DATABASE_URL}
RUN npx prisma generate

# build da aplicação
RUN npm run build

# Etapa de produção
FROM node:23.4.0-slim AS runner
WORKDIR /app

# instalar só prod deps
RUN apt-get update -y && apt-get install -y openssl
COPY package.json package-lock.json ./
RUN npm ci --only=production

# copiar build, client e migrations
COPY --from=builder /app/dist        ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma      ./prisma

# vars de ambiente
ENV NODE_ENV=production
ARG API_KEY
ARG ANTHROPIC_API_KEY
ARG DATABASE_URL
ENV API_KEY=${API_KEY} \
    ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY} \
    DATABASE_URL=${DATABASE_URL}

EXPOSE 3001
CMD ["node", "dist/src/main.js"]
