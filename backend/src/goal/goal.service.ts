import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class GoalService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.goal.findMany({
      orderBy: { label: 'asc' },
    })
  }

  async create(label: string) {
    return this.prisma.goal.create({
      data: { label },
    })
  }

  async findByLabel(label: string) {
    return this.prisma.goal.findFirst({
      where: { label: label.trim() },
    })
  }
}