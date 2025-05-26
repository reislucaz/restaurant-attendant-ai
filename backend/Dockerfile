FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist        ./dist
COPY --from=builder /app/prisma      ./prisma
COPY package*.json ./

ARG API_KEY
ARG ANTHROPIC_API_KEY

ENV NODE_ENV=production
ENV API_KEY=${API_KEY}
ENV ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}

EXPOSE 3001
CMD ["node", "dist/main"]
