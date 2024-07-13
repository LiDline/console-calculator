FROM node:20-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app
COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm build