import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify'
import { join } from 'path'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  app.setViewEngine({
    engine: {
      pug: require('pug'),
    },
    templates: join(__dirname, '..', 'views'),
  })
  const configService = app.get(ConfigService)
  const port = configService.get('APP_PORT')
  await app.listen(port)
}
bootstrap()
