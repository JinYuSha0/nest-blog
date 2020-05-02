import * as Joi from 'joi'
import { Module } from '@nestjs/common'
import { UserModule } from '@modules/user/user.module'
import { ConfigModule } from '@nestjs/config'
import CacheModule from '@modules/cache/cache.module'
import DBModule from '@modules/db/db.module'
import appConfiguration from '@config/app.config'
import mongodbConfiguration from '@config/mongodb.config'
import redisConfiguration from '@config/redis.config'
import emailConfiguration from '@config/email.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      ignoreEnvFile: false,
      isGlobal: true,
      load: [
        appConfiguration,
        mongodbConfiguration,
        redisConfiguration,
        emailConfiguration,
      ],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        APP_PORT: Joi.number().default(3000),
      }),
    }),
    DBModule,
    CacheModule,
    UserModule,
  ],
  exports: [CacheModule],
})
export class AppModule {}
