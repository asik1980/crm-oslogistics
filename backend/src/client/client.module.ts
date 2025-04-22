import { Module } from '@nestjs/common'
import { ClientService } from './client.service'
import { ClientController } from './client.controller'
import { MailService } from '../mail/mail.service'

@Module({
  providers: [ClientService, MailService],
  controllers: [ClientController],
})
export class ClientModule {}
