import * as Joi from 'joi'
import { Module } from '@nestjs/common'
import { UserModule } from '@modules/user/user.module'
import { ConfigModule } from '@nestjs/config'
import CacheModule from '@modules/cache/cache.module'
import DBModule from '@modules/db/db.module'
import appConfiguration from '@configs/app.config'
import mongodbConfiguration from '@configs/mongodb.config'
import redisConfiguration from '@configs/redis.config'
import emailConfiguration from '@configs/email.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
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
