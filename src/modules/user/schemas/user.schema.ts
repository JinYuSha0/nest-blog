import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      index: true,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
      maxlength: 36,
    },
    email: {
      type: String,
      index: true,
      maxlength: 320,
    },
    valid: {
      type: Boolean,
      required: true,
      default: false,
    },
    level: {
      type: Number,
      required: true,
      default: 1,
    },
    experience: {
      type: Number,
      required: true,
      default: 0,
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
