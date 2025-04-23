import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

let prismaGlobal: PrismaClient | null = null

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    if (!prismaGlobal) {
      console.log('⚠️ TWORZENIE PRISMA GLOBAL...')
      prismaGlobal = new PrismaClient()
    }

    // zamiast super(), podstawiam ręcznie
    super()

    Object.assign(this, prismaGlobal)
  }

  async onModuleInit() {
    console.log('✅ PrismaService: onModuleInit()')
    await this.$connect()
  }

  async onModuleDestroy() {
    console.log('🛑 PrismaService: onModuleDestroy()')
    await this.$disconnect()
  }
}
