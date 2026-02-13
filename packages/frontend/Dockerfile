# Claw Control Frontend
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY packages/frontend/package*.json ./packages/frontend/
RUN npm ci
COPY . .
RUN npm run build --workspace=@claw-control/frontend

# Production - nginx with basic auth
FROM nginx:alpine
RUN apk add --no-cache apache2-utils
COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html
COPY packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY packages/frontend/entrypoint-nginx.sh /docker-entrypoint.d/40-config.sh
RUN chmod +x /docker-entrypoint.d/40-config.sh && touch /etc/nginx/.htpasswd
EXPOSE 80
