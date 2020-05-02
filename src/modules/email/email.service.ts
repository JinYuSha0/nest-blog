import * as nodemailer from 'nodemailer'
import * as pug from 'pug'
import { join } from 'path'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Mail = require('nodemailer/lib/mailer')

interface SendEmailInfo {
  to: string
  subject: string
  text: string
  html: string
}

type sendEmailOptions = {
  url: string
  title: string
  subject: string
  desc: string
  appName: string
  image: string
}

@Injectable()
export default class Email {
  private transporter: Mail
  private config: ConfigService

  constructor(config: ConfigService) {
    this.config = config
    this.transporter = nodemailer.createTransport({
      host: config.get('email.host'),
      port: config.get('email.port'),
      secure: true,
      auth: {
        user: config.get('email.user'),
        pass: config.get('email.pass'),
      },
    })
  }

  sendEmail = async ({ to, subject, text, html }: SendEmailInfo) => {
    const info = await this.transporter.sendMail({
      from: `"${this.config.get('app.name')}" <1009943858@qq.com>`,
      to,
      subject,
      text,
      html,
    })
    return info
  }

  sendRegisterEmail = async (to: string, options: sendEmailOptions) => {
    const subject = `${this.config.get('app.name')} 激活邮件`
    const text = ''
    const html = pug.renderFile(
      join(__dirname, '../../../views/registerEmail.pug'),
      options,
    )
    const info = await this.sendEmail({ to, subject, text, html })
    return info
  }
}
