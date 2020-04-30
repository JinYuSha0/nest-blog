import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  UseInterceptors,
  Inject,
  CACHE_MANAGER,
  CacheStore,
  CacheInterceptor,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/user.dto'
import { ValidationPipe } from '@pipes/validation.pipe'
import { IpAccessLimitInterceptor } from '@interceptor/ipAccessLimit.interceptor'

@Controller('user')
@UseInterceptors(IpAccessLimitInterceptor(10))
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private readonly cacheManager,
  ) {}

  @Get('register')
  create(@Query(new ValidationPipe()) body: CreateUserDto): any {
    // this.cacheManager.set('aaa', '111', { ttl: 10 })
    return this.userService.create(body)
  }

  @Get('test')
  test() {
    return 'Hello World'
  }
}
