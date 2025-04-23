import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(body: any) {
    const { clientId, goalId, doneAt, notes, status } = body
  
    if (
      clientId == null ||
      goalId == null ||
      !doneAt ||
      !status
    ) {
      throw new BadRequestException('Brakuje wymaganych danych.')
    }
  
    return this.prisma.task.create({
      data: {
        clientId: Number(clientId),
        goalId: Number(goalId),
        doneAt: new Date(doneAt),
        plannedAt: new Date(doneAt),
        notes: notes?.trim(),
        status: status.toUpperCase(),
      },
    })
  }
}
