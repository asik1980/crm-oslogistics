import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ClientService {
  constructor(
    @Inject('PrismaClient') private readonly prisma: PrismaClient,
  ) {}

  async getClients(userId: number) {
    return this.prisma.client.findMany({
      where: { userId },
    });
  }

  async createClient(
    data: { name: string; email: string; phone?: string },
    userId: number
  ) {
    return this.prisma.client.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async updateClient(id: number, data: { name?: string; email?: string; phone?: string }) {
    return this.prisma.client.update({
      where: { id },
      data,
    });
  }

  async deleteClient(id: number) {
    return this.prisma.client.delete({
      where: { id },
    });
  }
}
