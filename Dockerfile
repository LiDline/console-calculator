FROM node:20-alpine AS builder
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm install -g pnpm
WORKDIR /app
COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm build


FROM node:20-alpine AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]