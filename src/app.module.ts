import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from '@modules/user/user.module'
import CacheModule from '@modules/cache/cache.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost', {
      dbName: 'blog',
      user: 'root',
      pass: '123456',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    CacheModule,
    UserModule,
  ],
  exports: [CacheModule],
})
export class AppModule {}
