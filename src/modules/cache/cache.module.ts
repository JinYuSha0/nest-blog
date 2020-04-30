import { CacheModule } from '@nestjs/common'
import * as redisStore from 'cache-manager-redis-store'

export default CacheModule.register({
  store: redisStore,
  host: 'localhost',
  port: 6379,
  ttl: 60,
})
