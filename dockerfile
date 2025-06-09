FROM node:21-alpine AS builder

RUN midir -p /app
WORKDIR /app
COPY package.json package-lock.json svelte.config.js ./
RUN npm ci --only=production
COPY . .
COPY .env .env
RUN npx drizzle-kit push --force
RUN npm run build
RUN npm prune --production

FROM node:21-alpine
RUN adduser -D node
RUN mkdir -p /app
RUN chown -R node:node /app
USER node
WORKDIR /app
COPY --from=builder --chown=node:node /app/build build/
COPY --from=builder --chown=node:node /app/node_modules node_modules/
COPY --chown=node:node package.json .
EXPOSE 8001
ENV NODE_ENV=production
CMD [ "node","-r", "dotenv/config", "build" ]