import { Length, IsString, IsNumberString, IsEmail } from 'class-validator'

export class ValidEmailDto {
  @Length(4)
  @IsString()
  user: string

  @IsEmail()
  email: string

  @Length(13)
  @IsNumberString()
  timestamp: string

  @IsString()
  sign: string
}
