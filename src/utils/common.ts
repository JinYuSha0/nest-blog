import Request from 'request'

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
