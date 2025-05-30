import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ClientController } from './client/client.controller'
import { ClientService } from './client/client.service'
import { PrismaService } from './prisma/prisma.service'
import { PrismaClient } from '@prisma/client'
import { UserController } from './user/user.controller'
import { UserService } from './user/user.service'
import { NipController } from './client/nip.controller'
import { MailService } from './mail/mail.service'
import { GoalModule } from './goal/goal.module'
import { TaskModule } from './task/task.module'
import { GusModule } from './gus/gus.module'
import { AppController } from './app.controller' // ✅ dodane

@Module({
  imports: [AuthModule, GoalModule, TaskModule, GusModule],
  controllers: [
    ClientController,
    UserController,
    NipController,
    AppController, // ✅ dodane
  ],
  providers: [
    PrismaService,
    ClientService,
    UserService,
    MailService,
    {
      provide: 'PrismaClient',
      useValue: new PrismaClient(),
    },
  ],
})
export class AppModule {}

