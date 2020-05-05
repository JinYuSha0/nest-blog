import { Length, IsString, IsNumberString, IsEmail } from 'class-validator'

export class ValidEmailDto {
  @Length(4, 20)
  @IsString()
  readonly user: string

  @IsEmail()
  @Length(4, 320)
  readonly email: string

  @Length(13)
  @IsNumberString()
  readonly timestamp: number

  @IsString()
  readonly sign: string
}
