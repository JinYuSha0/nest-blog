import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import CacheModule from '@modules/cache/cache.module'
import EmailService from '@modules/email/email.service'
import { UserSchema } from './schemas/user.schema'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('app.secureKey'),
        signOptions: { expiresIn: '12h' },
      }),
      inject: [ConfigService],
    }),
    CacheModule,
  ],
  controllers: [UserController],
  providers: [UserService, EmailService],
})
export class UserModule {}
