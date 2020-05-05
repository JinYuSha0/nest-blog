import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  Inject,
  CACHE_MANAGER,
  Post,
  Body,
} from '@nestjs/common'
import { UserService } from './user.service'
import { RegisterDto } from './dto/register.dto'
import { ValidEmailDto } from './dto/valid-email.dto'
import { ValidationPipe } from '@pipes/validation.pipe'
import { IpAccessLimitInterceptor } from '@interceptors/ip-access-limit.interceptor'
import { LoginDto } from './dto/login.dto'

@Controller('user')
@UseInterceptors(IpAccessLimitInterceptor({ count: 30, duration: 300 }))
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private readonly cacheManager,
  ) {}

  @Post('register')
  register(@Body(new ValidationPipe()) body: RegisterDto): any {
    return this.userService.register(body)
  }

  @Get('valid')
  valid(@Query(new ValidationPipe()) query: ValidEmailDto): any {
    return this.userService.valid(query)
  }

  @Get('login')
  login(@Query(new ValidationPipe()) body: LoginDto): any {
    return this.userService.login(body)
  }
}
