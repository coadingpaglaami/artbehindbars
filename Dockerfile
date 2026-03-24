# Stage 1: Install dependencies
FROM node:20-alpine AS deps

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: Build the Next.js app
FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm run build

# Stage 3: Production image
FROM node:20-alpine AS runner

WORKDIR /app

RUN npm install -g pnpm

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000

CMD ["pnpm", "run", "start"]

# To build the Docker image, run:
# docker build -t artbehindbars-frontend .
