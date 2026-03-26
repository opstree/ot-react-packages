FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install 
RUN npm run build --workspace=docs
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
