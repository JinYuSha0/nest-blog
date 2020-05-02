import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema(
  {
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
    reserveEmail: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      index: true,
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
  },
  {
    timestamps: true,
  },
)
