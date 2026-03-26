FROM node:22-alpine AS base
RUN npm install -g turbo
FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune --scope=docs --docker
FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
RUN turbo run build --filter=docs...
FROM nginx:alpine AS runner
COPY --from=builder /app/apps/www/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

