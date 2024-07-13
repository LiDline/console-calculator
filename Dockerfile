FROM node:20-alpine AS builder
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm install -g pnpm@9.3.0
WORKDIR /app
COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm build


FROM node:20-alpine AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./standalone/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./standalone/public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./standalone/public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./standalone/.next/public


EXPOSE 3000

CMD ["node", "/app/standalone/server.js"]