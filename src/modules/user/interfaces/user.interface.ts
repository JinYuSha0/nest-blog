import { Document } from 'mongoose'

export interface User extends Document {
  user: string
  password: string
  email: string
  level?: number
  vip?: number
  emailValid?: Boolean
}
