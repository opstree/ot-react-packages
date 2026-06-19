FROM node:22-alpine AS base
RUN npm install -g turbo

FROM base AS pruner
WORKDIR /app

# Copy the entire monorepo to ensure all workspace packages are available
COPY . .

# Install dependencies from the root
RUN npm install

# Build the documentation app specifically
RUN npm run build --workspace=docs

FROM nginx:alpine
# Copy the built files from the apps/www/dist directory
COPY --from=builder /app/apps/www/dist /usr/share/nginx/html
COPY apps/www/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]


