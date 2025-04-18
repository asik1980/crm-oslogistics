
import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ClientController } from './client/client.controller'
import { ClientService } from './client/client.service'
import { PrismaClient } from '@prisma/client'
import { UserController } from './user/user.controller'
import { UserService } from './user/user.service'
import { NipController } from './client/nip.controller'

@Module({
  imports: [AuthModule],
  controllers: [ClientController, UserController, NipController],
  providers: [
    ClientService,
    UserService,
    {
      provide: 'PrismaClient',
      useValue: new PrismaClient(),
    },
  ],
})
export class AppModule {}
