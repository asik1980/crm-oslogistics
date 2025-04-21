import { Injectable, Inject } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class ClientService {
  constructor(@Inject('PrismaClient') private readonly prisma: PrismaClient) {}

  async getClients(userId: number, isAdmin: boolean) {
    return this.prisma.client.findMany({
      where: isAdmin ? {} : { userId },
      include: {
        user: true,
        contacts: true,
      },
    })
  }

  async createClient(data: any) {
    const { contacts = [], ...clientData } = data

    // Usuń z kontaktów pola id i clientId (jeśli są)
    const sanitizedContacts = contacts.map(({ id, clientId, ...rest }) => rest)

    return this.prisma.client.create({
      data: {
        ...clientData,
        contacts: {
          create: sanitizedContacts,
        },
      },
      include: {
        contacts: true,
        user: true,
      },
    })
  }

  async updateClient(id: number, data: any) {
    const {
      id: _,
      createdAt,
      updatedAt,
      user,
      contacts = [],
      ...rest
    } = data

    // 1. Usuń istniejące kontakty
    await this.prisma.contact.deleteMany({
      where: { clientId: id }
    })

    // 2. Usuń z kontaktów pola id i clientId
    const sanitizedContacts = contacts.map(({ id, clientId, ...rest }) => rest)

    // 3. Zaktualizuj klienta
    return this.prisma.client.update({
      where: { id },
      data: {
        ...rest,
        contacts: {
          create: sanitizedContacts
        }
      },
      include: {
        contacts: true,
        user: true
      }
    })
  }

  async deleteClient(id: number) {
    return this.prisma.client.delete({
      where: { id },
    })
  }
}
