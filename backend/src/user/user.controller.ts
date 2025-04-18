import { Controller, Get, Post, Put, Delete, Body, Param, Request, UseGuards, ForbiddenException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserService } from './user.service'

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private checkAdmin(req) {
    if (req.user.role !== 'ADMIN') throw new ForbiddenException('Brak dostępu')
  }

  @Get()
  async getAll(@Request() req) {
    this.checkAdmin(req)
    return this.userService.getAll()
  }

  @Post()
  async create(@Request() req, @Body() body) {
    this.checkAdmin(req)
    return this.userService.create(body)
  }

  @Put(':id')
  async update(@Request() req, @Param('id') id: number, @Body() body) {
    this.checkAdmin(req)
    return this.userService.update(+id, body)
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: number) {
    this.checkAdmin(req)
    return this.userService.remove(+id)
  }
}
