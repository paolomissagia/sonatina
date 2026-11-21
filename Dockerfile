FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

EXPOSE 8081

CMD ["sh", "-c", "npm ci && npx expo start --web --port 8081"]
