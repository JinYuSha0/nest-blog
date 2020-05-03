import { ConfigService } from '@nestjs/config'
import EmailService from '@modules/email/email.service'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './interfaces/user.interface'
import { CreateUserDto } from './dto/user.dto'
import { ValidEmailDto } from './dto/valid-email.dto'
import * as Utils from '@utils/common'
import * as querystring from 'querystring'

function genValidSign(
  secureKey: string,
  user: string,
  email: string,
  timestamp: number,
): string {
  return Utils.md5(timestamp + Utils.md5(user + Utils.md5(secureKey + email)))
}

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const timestamp = Utils.getCurrTimestampWithPadding(24 * 60 * 60 * 1000)
    const sign = genValidSign(
      this.configService.get('app.secureKey'),
      createUserDto.user,
      createUserDto.password,
      timestamp,
    )
    const query = {
      user: createUserDto.user,
      email: createUserDto.reserveEmail,
      timestamp,
      sign,
    }
    const sendEmailInfo = await this.emailService.sendRegisterEmail(
      createUserDto.reserveEmail,
      {
        url:
          this.configService.get('app.host') +
          'validRegisterEmail?' +
          querystring.stringify(query),
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

  async valid(validEmailDto: ValidEmailDto): Promise<Boolean> {
    return true
  }
}
