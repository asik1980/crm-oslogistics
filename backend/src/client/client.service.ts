import { Injectable, Inject } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { MailService } from '../mail/mail.service'

@Injectable()
export class ClientService {
  constructor(
    @Inject('PrismaClient') private readonly prisma: PrismaClient,
    private readonly mailService: MailService
  ) {}

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
    const { id: _, user, createdAt, updatedAt, contacts = [], userId, ...rest } = data

    const existingClient = await this.prisma.client.findUnique({ where: { id } })

    await this.prisma.contact.deleteMany({ where: { clientId: id } })

    const sanitizedContacts = contacts.map(({ id, clientId, _changed, ...c }) => c)

    const updatedClient = await this.prisma.client.update({
      where: { id },
      data: {
        ...rest,
        contacts: {
          create: sanitizedContacts,
        },
        ...(userId ? { user: { connect: { id: Number(userId) } } } : {}),
      },
      include: {
        contacts: true,
        user: true,
      },
    })

    if (
      updatedClient.status !== existingClient.status &&
      ['ZATWIERDZONY', 'ODRZUCONY'].includes(updatedClient.status)
    ) {
      const assignedUser = await this.prisma.user.findUnique({
        where: { id: Number(userId || existingClient.userId) },
      })

      if (assignedUser?.email) {
        await this.mailService.sendClientAccepted(
          assignedUser.email,
          `${updatedClient.name} – status został zmieniony na: ${updatedClient.status}`
        )
      }
    }

    return updatedClient
  }

  async deleteClient(id: number) {
    return this.prisma.client.delete({
      where: { id },
    })
  }
}
