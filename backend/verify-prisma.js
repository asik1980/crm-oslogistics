const { PrismaClient } = require('@prisma/client');

console.log('📦 TEST: Inicjalizacja PrismaClient...');
const prisma = new PrismaClient();

prisma.$connect()
  .then(() => {
    console.log('✅ Prisma działa, połączenie OK.');
    return prisma.$disconnect();
  })
  .catch((err) => {
    console.error('❌ Prisma crash:', err);
  });
