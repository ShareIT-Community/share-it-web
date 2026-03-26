FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS deps

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN pnpm install --prod --frozen-lockfile

FROM base AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm run build

FROM nginx:alpine AS runtime

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY /.nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/ .

EXPOSE 8080

ENTRYPOINT ["nginx", "-g", "daemon off;"]