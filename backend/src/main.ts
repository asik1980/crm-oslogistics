import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // ✅ Middleware naprawiający podwójne slashe
  app.use((req, res, next) => {
    req.url = req.url.replace(/\/{2,}/g, '/')
    next()
  })

  app.enableCors({
    origin: 'http://localhost:5173',
  })

  // ✅ Prefix wymagany przez frontend
//  app.setGlobalPrefix('api')

  await app.listen(3000)
}
bootstrap()

