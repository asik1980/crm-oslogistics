import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // ⬇️ Dodaj to, by frontend na porcie 5173 mógł się łączyć z backendem
  app.enableCors({
    origin: 'http://localhost:5173',
  })

  await app.listen(3000)
}
bootstrap()
