import {
  CacheInterceptor,
  ExecutionContext,
  CallHandler,
  ForbiddenException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import * as Utils from '@utils/common'

export function IpAccessLimitInterceptor(limit: number): any {
  return class Interceptor extends CacheInterceptor {
    async intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Promise<Observable<any>> {
      const req = context.switchToHttp().getRequest()
      const ip = Utils.getReallyIp(req)
      const controllerName = Utils.getControllerName(req)
      const keyName = `ip.limit.${controllerName}.${ip}`
      let count = (await this.cacheManager.get(keyName)) || 0
      await this.cacheManager.set(keyName, ++count, { ttl: 60 })
      console.log(count, limit)
      if (count > limit) {
        throw new ForbiddenException()
      }
      return next.handle()
    }
  }
}
