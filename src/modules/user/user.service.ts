import { ConfigService } from '@nestjs/config'
import EmailService from '@modules/email/email.service'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './interfaces/user.interface'
import { RegisterDto } from './dto/register.dto'
import { ValidEmailDto } from './dto/valid-email.dto'
import * as Utils from '@utils/common'
import * as querystring from 'querystring'
import BussinessException from '@exceptions/bussiness.exception'
import { ErrorMessage, ErrorCode } from '@constants/error.enum'
import { LoginDto } from './dto/login.dto'

function genValidSign(
  secureKey: string,
  user: string,
  email: string,
  timestamp: number,
): string {
  return Utils.md5(timestamp + Utils.md5(user + Utils.md5(secureKey + email)))
}

function encryptPassword(secureKey: string, password: string) {
  return Utils.md5(
    secureKey + Utils.md5(secureKey + Utils.md5(secureKey + password)),
  )
}

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    // 判断用户名和邮箱是否有一样被占用
    const duplicate = await this.userModel.findOne({
      $and: [
        { $or: [{ user: registerDto.user }, { email: registerDto.email }] },
        { valid: true },
      ],
    })

    if (duplicate) {
      if (duplicate.user === registerDto.user) {
        throw new BussinessException(
          ErrorMessage.USER_DUPLICATE,
          ErrorCode.USER_DUPLICATE,
        )
      }

      if (duplicate.email === registerDto.email) {
        throw new BussinessException(
          ErrorMessage.EMAIL_DUPLICATE,
          ErrorCode.EMAIL_DUPLICATE,
        )
      }
    }

    const timestamp = Utils.getCurrTimestampWithPadding(24 * 60 * 60 * 1000)
    const sign = genValidSign(
      this.configService.get('app.secureKey'),
      registerDto.user,
      registerDto.email,
      timestamp,
    )
    const query = {
      user: registerDto.user,
      email: registerDto.email,
      timestamp,
      sign,
    }
    await this.emailService.sendRegisterEmail(registerDto.email, {
      url:
        this.configService.get('app.host') +
        'user/valid?' +
        querystring.stringify(query),
      title: '验证邮箱',
      subject: `亲爱的${registerDto.user}`,
      desc: '恭喜你注册成功',
      appName: this.configService.get('app.name'),
      image: '',
    })
    new this.userModel({
      ...registerDto,
      password: encryptPassword(
        this.configService.get('app.secureKey'),
        registerDto.password,
      ),
    }).save()
    return {
      user: registerDto.user,
      email: registerDto.email,
    }
  }

  async valid(validEmailDto: ValidEmailDto): Promise<any> {
    // 判断邮箱是否被占用
    const isValid = await this.userModel.findOne({
      email: validEmailDto.email,
      valid: true,
    })

    if (
      isValid ||
      validEmailDto.timestamp < Utils.getCurrTimestampWithPadding()
    ) {
      throw new BussinessException(
        ErrorMessage.EMAIL_SIGN_INVALID,
        ErrorCode.EMAIL_SIGN_INVALID,
      )
    }

    const sign = genValidSign(
      this.configService.get('app.secureKey'),
      validEmailDto.user,
      validEmailDto.email,
      validEmailDto.timestamp,
    )

    if (sign === validEmailDto.sign) {
      // 通过校验
      await this.userModel.updateOne(
        {
          $and: [
            {
              user: validEmailDto.user,
              email: validEmailDto.email,
            },
          ],
        },
        { valid: true },
      )

      // 删除其余使用同用户名或者同邮箱的未通过校验的账号
      await this.userModel.remove({
        $and: [
          {
            $or: [{ user: validEmailDto.user }, { email: validEmailDto.email }],
          },
          { valid: false },
        ],
      })

      return true
    } else {
      // 未通校验
      throw new BussinessException(
        ErrorMessage.EMAIL_VALID_FAILURE,
        ErrorCode.EMAIL_VALID_FAILURE,
      )
    }
  }

  async login(loginDto: LoginDto): Promise<any> {
    let loginRes = null

    if (loginDto.user) {
      loginRes = await this.userModel.findOne({
        user: loginDto.user,
        password: encryptPassword(
          this.configService.get('app.secureKey'),
          loginDto.password,
        ),
      })
    }

    if (loginDto.email && !loginRes) {
      loginRes = await this.userModel.findOne({
        email: loginDto.email,
        password: encryptPassword(
          this.configService.get('app.secureKey'),
          loginDto.password,
        ),
      })
    }

    if (!loginRes) {
      throw new BussinessException(
        ErrorMessage.LOGIN_FAILURE,
        ErrorCode.LOGIN_FAILURE,
      )
    }

    return loginRes
  }
}
