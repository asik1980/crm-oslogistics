import { Module } from '@nestjs/common';
import { AppController } from './app.controller'; // ✅ TO DODAJ
import { ClientController } from './client/client.controller';
import { ClientService } from './client/client.service';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ClientController, AppController],
  providers: [
    ClientService,
    {
      provide: 'PrismaClient',
      useValue: new PrismaClient(),
    },
  ],
})
export class AppModule {}
