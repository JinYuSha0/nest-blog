import { CacheModule } from '@nestjs/common'
import * as redisStore from 'cache-manager-redis-store'
import { ConfigModule, ConfigService } from '@nestjs/config'

export default CacheModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    store: redisStore,
    host: configService.get<string>('redis.host'),
    port: configService.get<number>('redis.port'),
    pass: configService.get<string>('redis.pass'),
  }),
  inject: [ConfigService],
})
