import { IsString, IsEmail, Length, ValidateIf } from 'class-validator'

export class LoginDto {
  @Length(4, 20)
  @IsString()
  @ValidateIf(o => o.email == null)
  readonly user?: string

  @Length(4, 320)
  @IsEmail()
  @ValidateIf(o => o.user == null)
  readonly email?: string

  @Length(6, 36)
  @IsString()
  readonly password: string
}
