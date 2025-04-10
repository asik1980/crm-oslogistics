#!/bin/bash

echo "📦 Tworzę katalogi projektu CRM OS Logistics..."

mkdir -p backend/src
mkdir -p backend/prisma
mkdir -p nginx
mkdir -p db

echo "📄 Tworzę plik docker-compose.yml..."

cat <<EOF > docker-compose.yml
version: '3.9'

services:
  mysql:
    image: mysql:8.0
    container_name: crm-mysql
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: crm_oslogistics
    volumes:
      - ./db:/var/lib/mysql
    ports:
      - "3306:3306"

  backend:
    build: ./backend
    container_name: crm-backend
    restart: unless-stopped
    env_file:
      - ./backend/.env
    depends_on:
      - mysql
    ports:
      - "3000:3000"
    volumes:
      - ./backend:/app

  nginx:
    image: nginx:latest
    container_name: crm-proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - backend
EOF
echo "📄 Tworzę plik backend/.env..."

cat <<EOF > backend/.env
DATABASE_URL="mysql://root:root@mysql:3306/crm_oslogistics"
JWT_SECRET="super_secret_key_here"
PORT=3000
EOF

echo "📄 Tworzę plik backend/Dockerfile..."

cat <<EOF > backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]
EOF

echo "📄 Tworzę plik nginx/default.conf..."

cat <<EOF > nginx/default.conf
server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://crm-backend:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

echo "📄 Tworzę backend/prisma/schema.prisma..."

cat <<EOF > backend/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Client {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  phone     String?
  createdAt DateTime @default(now())
}
EOF
echo "📄 Tworzę plik README.md..."

cat <<EOF > README.md
# CRM OS Logistics

## Uruchomienie

### 1. Buduj i uruchom środowisko
\`\`\`bash
docker-compose up -d --build
\`\`\`

### 2. Sprawdź logi backendu
\`\`\`bash
docker logs -f crm-backend
\`\`\`

### 3. Wejdź w przeglądarce:
\`\`\`
http://localhost
\`\`\`

## Uwagi

- Domyślne dane bazy: użytkownik \`root\`, hasło \`root\`
- ORM: Prisma (plik \`backend/prisma/schema.prisma\`)
- API startowe pod adresem \`/clients\` (do rozbudowy)
EOF

echo "✅ Projekt został przygotowany!"
echo "💡 Teraz uruchom:"
echo ""
echo "   docker-compose up -d --build"
echo ""
echo "🔍 Potem sprawdź w przeglądarce: http://localhost"

exit 0
