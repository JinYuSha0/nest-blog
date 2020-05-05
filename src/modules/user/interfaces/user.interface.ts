import { Document } from 'mongoose'

export interface User extends Document {
  user: string
  password: string
  email: string
  valid?: Boolean
  level?: number
  vip?: number
}
