FROM node:lts-alpine

WORKDIR /app

ENV CI=true

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

EXPOSE 5173

CMD ["sh", "-c", "pnpm install --frozen-lockfile && pnpm dev --host 0.0.0.0"]
