import { Controller, Get, Param, Inject } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Controller('nip')
export class NipController {
  constructor(@Inject('PrismaClient') private readonly prisma: PrismaClient) {}

  @Get(':nip')
  async checkNip(@Param('nip') nip: string) {
    const existing = await this.prisma.client.findUnique({
      where: { nip },
      include: { user: true }
    })

    if (existing) {
      return {
        exists: true,
        owner: {
          id: existing.userId,
          name: `${existing.user.firstName} ${existing.user.lastName}`
        }
      }
    }

    // 👇 SYMULACJA DANYCH CEIDG
    const mockData = {
      '5862282298': {
        name: 'OS Logistics',
        city: 'Gdynia',
        zipCode: '81-249',
        address: 'Kapitańska 47a',
        nip: '5862282298',
        website: 'www.oslogistics.pl',
        email: 'info@oslogistics.pl',
        phone: '720882884'
      },
      '9999999999': {
        name: 'Test Spedycja',
        city: 'Warszawa',
        zipCode: '00-001',
        address: 'ul. Transportowa 10',
        nip: '9999999999',
        website: 'www.testsped.pl',
        email: 'biuro@testsped.pl',
        phone: '500000000'
      }
    }

    return {
      exists: false,
      data: mockData[nip] || null
    }
  }
}
