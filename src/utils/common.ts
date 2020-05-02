import Request from 'request'
import * as crypto from 'crypto'

export function getReallyIp(req: Request): string {
  try {
    let ip =
      req.headers['x-forwarded-for'] ||
      req.ip ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress ||
      ''
    return ip
  } catch {
    return ''
  }
}

export function getControllerName(req: Request): string {
  return req.raw.url.match(/\/(.*?)\//)[1]
}

function hash(
  method: string,
  s: string,
  format?: crypto.HexBase64Latin1Encoding,
) {
  const sum = crypto.createHash(method)
  sum.update(s, 'utf8')
  return sum.digest(format || 'hex')
}

export function md5(
  s: string,
  format?: crypto.HexBase64Latin1Encoding,
): string {
  return hash('md5', s, format)
}

export function getCurrTimestampWithPadding(padding: number = 0): number {
  return +new Date() + padding
}
