import { Module, Global } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import CacheModule from '@modules/cache/cache.module'
import { UserSchema } from './schemas/user.schema'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Global()
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
  providers: [UserService],
})
export class UserModule {}
