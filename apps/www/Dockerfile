FROM node:22-alpine AS base
RUN npm install -g turbo

# Step 1: Prune the workspace for the 'docs' app
FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune --scope=docs --docker

# Step 2: Build the application
FROM base AS builder
WORKDIR /app

# First copy pruned package.json and lockfile to install dependencies (better caching)
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm install

# Copy pruned source code and turbo config
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json

# Build the project using turbo
RUN turbo run build --filter=docs...

# Step 3: Serve the application with Nginx
FROM nginx:alpine AS runner
# Copy the build output from the builder stage
# Standard Vite output is in 'dist' directory of the app
COPY --from=builder /app/apps/www/dist /usr/share/nginx/html
# Copy custom nginx configuration
COPY apps/www/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

