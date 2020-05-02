import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import CacheModule from '@modules/cache/cache.module'
import EmailService from '@modules/email/email.service'
import { UserSchema } from './schemas/user.schema'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    CacheModule,
  ],
  controllers: [UserController],
  providers: [UserService, EmailService],
})
export class UserModule {}
