FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install --workspaces --include-workspace-root
RUN npm run build 
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
