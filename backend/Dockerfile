FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# ✅ PRZENOSIMY WCZEŚNIEJ żeby była dostępna struktura projektu
COPY . /app

# ✅ Generujemy Prisma client z widocznym schema.prisma
RUN npx prisma generate

RUN npm run build

CMD ["npm", "run", "start:prod"]
