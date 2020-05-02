import * as crypto from 'crypto'
import { ConfigService } from '@nestjs/config'
import EmailService from '@modules/email/email.service'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './interfaces/user.interface'
import { CreateUserDto } from './dto/user.dto'
import { ValidEmailDto } from './dto/validEmail.dto'
@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // crypto.createHash('md5').update()
    const sendEmailInfo = await this.emailService.sendRegisterEmail(
      createUserDto.email,
      {
        url: this.configService.get('app.host'),
        title: '验证邮箱',
        subject: `亲爱的${createUserDto.user}`,
        desc: '恭喜你注册成功',
        appName: this.configService.get('app.name'),
        image: '',
      },
    )
    const createUser = new this.userModel(createUserDto)
    return createUser.save()
  }

  async validEmail(validEmailDto: ValidEmailDto): Promise<Boolean> {
    return true
  }
}
