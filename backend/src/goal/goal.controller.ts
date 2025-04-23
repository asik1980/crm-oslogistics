import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  BadRequestException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GoalService } from './goal.service'

@UseGuards(AuthGuard('jwt'))
@Controller('goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Get()
  getAll() {
    return this.goalService.getAll()
  }

  @Post()
  async create(@Request() req, @Body('label') label: string) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Tylko admin może dodać cel.')
    }

    if (!label || !label.trim()) {
      throw new BadRequestException('Label celu nie może być pusty.')
    }

    const exists = await this.goalService.findByLabel(label)
    if (exists) {
      throw new ConflictException('Taki cel już istnieje.')
    }

    return this.goalService.create(label)
  }
}
