# build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npx prisma generate
RUN npm run build

# runtime
FROM node:20-alpine AS runner
WORKDIR /app

ARG API_KEY
ARG ANTHROPIC_API_KEY

ENV NODE_ENV=production \
    API_KEY=$API_KEY \
    ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

EXPOSE 3001
CMD ["node", "dist/main"]
