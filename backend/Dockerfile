# builder
FROM node:20-alpine AS builder
WORKDIR /app

# copiar e instalar deps
COPY package*.json ./
RUN npm ci --frozen-lockfile

# copiar código e gerar Prisma
COPY prisma ./prisma
COPY . .
RUN npx prisma generate
RUN npm run build

# runner
FROM node:20-alpine AS runner
WORKDIR /app

# criar user não-root
RUN addgroup -S app && adduser -S -G app app

# copiar apenas produção
COPY package*.json ./
RUN npm ci --only=production --frozen-lockfile

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

USER app
ENV NODE_ENV=production

ARG API_KEY
ARG ANTHROPIC_API_KEY
ENV API_KEY=${API_KEY} \
    ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}

EXPOSE 3001

CMD ["node", "dist/src/main"]
