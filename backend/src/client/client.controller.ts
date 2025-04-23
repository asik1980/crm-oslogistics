import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common'
import { ClientService } from './client.service'
import { AuthGuard } from '@nestjs/passport'

@UseGuards(AuthGuard('jwt'))
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async getClients(@Request() req, @Query() query: any) {
    const user = req.user
    const isAdmin = user.role === 'ADMIN'
    const userId = isAdmin ? Number(query.userId) || undefined : user.userId

    return this.clientService.getClients(userId, isAdmin, query)
  }

  @Post()
  async createClient(@Body() data: any) {
    return this.clientService.createClient(data)
  }

  @Put(':id')
  async updateClient(@Param('id') id: string, @Body() dto: any) {
    return this.clientService.updateClient(Number(id), dto)
  }

  @Delete(':id')
  async deleteClient(@Param('id') id: string) {
    return this.clientService.deleteClient(Number(id))
  }
}
