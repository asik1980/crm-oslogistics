import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { ClientService } from './client.service'
import { AuthGuard } from '@nestjs/passport'

@UseGuards(AuthGuard('jwt')) // 🔐 MUSI BYĆ!
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async getClients(@Request() req) {
    const userId = req.user.userId
    const isAdmin = req.user.role === 'ADMIN'
    return this.clientService.getClients(userId, isAdmin)
  }
}
