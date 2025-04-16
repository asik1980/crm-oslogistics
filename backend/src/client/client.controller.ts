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
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './create-client.dto';
import { UpdateClientDto } from './update-client.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt')) // Ochrona całego kontrolera
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async getClients(@Request() req) {
    const userId = req.user.userId;
    return this.clientService.getClients(userId);
  }

  @Post()
  async createClient(@Body() dto: CreateClientDto, @Request() req) {
    const userId = req.user.userId;
    return this.clientService.createClient(dto, userId);
  }

  @Put(':id')
  async updateClient(@Param('id') id: string, @Body() dto: UpdateClientDto) {
    return this.clientService.updateClient(Number(id), dto);
  }

  @Delete(':id')
  async deleteClient(@Param('id') id: string) {
    return this.clientService.deleteClient(Number(id));
  }
}
