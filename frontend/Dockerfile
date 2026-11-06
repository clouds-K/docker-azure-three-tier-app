# Stage 1: Build React App
FROM node:18-alpine AS build

WORKDIR /app

# Copier les fichiers package.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY . .

# Build de production React
RUN npm run build

# Stage 2: Serveur NGINX
FROM nginx:alpine

# Copier le build React dans NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Copier la configuration NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Script pour injecter les variables d'environnement au démarrage
RUN echo '#!/bin/sh' > /docker-entrypoint.d/40-inject-env.sh && \
    echo 'if [ -n "$REACT_APP_API_URL" ]; then' >> /docker-entrypoint.d/40-inject-env.sh && \
    echo '  find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|REACT_APP_API_URL_PLACEHOLDER|$REACT_APP_API_URL|g" {} +' >> /docker-entrypoint.d/40-inject-env.sh && \
    echo 'fi' >> /docker-entrypoint.d/40-inject-env.sh && \
    chmod +x /docker-entrypoint.d/40-inject-env.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]