import { Length, IsString, IsNumberString } from 'class-validator'

export class ValidEmailDto {
  @Length(4)
  @IsString()
  user: string

  @Length(13)
  @IsNumberString()
  timestamp: string

  @IsString()
  sign: string
}
