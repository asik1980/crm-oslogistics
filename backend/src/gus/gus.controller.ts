import { Controller, Post, Body, BadRequestException } from '@nestjs/common'
import { GusService } from './gus.service'

@Controller('gus')
export class GusController {
  constructor(private readonly gusService: GusService) {}

  @Post('nip')
  async getByNip(@Body('nip') nip: string) {
    if (!nip || nip.length !== 10) {
      throw new BadRequestException('Niepoprawny NIP')
    }
    return this.gusService.getDataByNip(nip)
  }
}
