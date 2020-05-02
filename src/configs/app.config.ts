import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
  name: process.env.APP_NAME,
  host: process.env.APP_HOST,
  secureKey: process.env.APP_SECURE_KEY,
}))
