import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  Inject,
  CACHE_MANAGER,
  Res,
  Render,
} from '@nestjs/common'
import { Response } from 'express'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/user.dto'
import { ValidationPipe } from '@pipes/validation.pipe'
import { IpAccessLimitInterceptor } from '@interceptor/ipAccessLimit.interceptor'
import EmailService from '@modules/email/email.service'

@Controller('user')
@UseInterceptors(IpAccessLimitInterceptor({ count: 30, duration: 300 }))
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private readonly cacheManager,
  ) {}

  @Get('register')
  create(@Query(new ValidationPipe()) body: CreateUserDto): any {
    return this.userService.create(body)
  }

  @Get('test')
  async test() {
    return 'test'
  }
}
