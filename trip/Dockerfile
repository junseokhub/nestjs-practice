FROM node:18-alpine as deps

WORKDIR /app

COPY package.json yarn.lock ./
RUN apk add --no-cache libc6-compat && yarn install --frozen-lockfile

FROM node:18-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nestjs

ARG ARG_DATABASE_HOST
ARG ARG_DATABASE_PORT
ARG ARG_DATABASE_USERNAME
ARG ARG_DATABASE_PASSWORD
ARG ARG_DATABASE_NAME
ARG ARG_REDIRECT_URL
ARG ARG_JWT_ACCESS_SECRET
ARG ARG_JWT_ACCESS_EXPIRATION_TIME

ENV DATABASE_HOST=${ARG_DATABASE_HOST}
ENV DATABASE_PORT=${ARG_DATABASE_PORT}
ENV DATABASE_USERNAME=${ARG_DATABASE_USERNAME}
ENV DATABASE_PASSWORD=${ARG_DATABASE_PASSWORD}
ENV DATABASE_NAME=${ARG_DATABASE_NAME}
ENV REDIRECT_URL=${ARG_REDIRECT_URL}
ENV JWT_ACCESS_SECRET=${ARG_JWT_ACCESS_SECRET}
ENV JWT_ACCESS_EXPIRATION_TIME=${ARG_JWT_ACCESS_EXPIRATION_TIME}

ENV NODE_ENV prod

COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
RUN mkdir -p /app/logs && chown -R nestjs:nodejs /app/logs
USER nestjs

EXPOSE 8080

CMD ["node", "dist/main"]
