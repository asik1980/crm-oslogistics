import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class UserService {
  private prisma = new PrismaClient()

  async getAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
      },
    })
  }

  async create(data: any) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        role: data.role || 'HANDLOWIEC',
      },
    })
  }

  async update(id: number, data: any) {
    const updateData = { ...data }

    if (!data.password || data.password === '') {
      delete updateData.password // usuń hasło jeśli puste
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
    })
  }


  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    })
  }
}
