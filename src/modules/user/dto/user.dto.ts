import { IsString, IsEmail, Length } from 'class-validator'

export class CreateUserDto {
  @Length(4)
  @IsString()
  user: string

  @Length(6)
  @IsString()
  password: string

  @IsEmail()
  email: string
}
