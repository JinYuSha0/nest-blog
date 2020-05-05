import { IsString, IsEmail, Length } from 'class-validator'

export class RegisterDto {
  @Length(4, 20)
  @IsString()
  readonly user: string

  @Length(6, 36)
  @IsString()
  readonly password: string

  @Length(4, 320)
  @IsEmail()
  readonly email: string
}
