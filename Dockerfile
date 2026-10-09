FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

EXPOSE 5173

CMD ["sh", "-c", "npm ci && npm run dev -- --host 0.0.0.0"]
