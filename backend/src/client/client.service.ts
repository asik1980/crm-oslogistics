import { Injectable, Inject } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class ClientService {
  constructor(@Inject('PrismaClient') private readonly prisma: PrismaClient) {}

  async getClients(userId: number, isAdmin: boolean) {

    return this.prisma.client.findMany({
      where: isAdmin ? {} : { userId },
      include: { user: true },
    })
  }

async createClient(data: any, userId: number) {
  return this.prisma.client.create({
    data: {
      ...data,
      user: {
        connect: { id: userId },
      },
    },
  })
}

  async updateClient(id: number, data: any) {
    return this.prisma.client.update({
      where: { id },
      data,
    })
  }

  async deleteClient(id: number) {
    return this.prisma.client.delete({
      where: { id },
    })
  }
}
