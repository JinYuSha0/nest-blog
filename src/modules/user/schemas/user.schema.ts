import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  vip: {
    type: Number,
    required: true,
    default: 0,
  },
  emailValid: {
    type: Boolean,
    required: true,
    default: false,
  },
})
