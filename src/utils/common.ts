export function getReallyIp(req: any): string {
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

export function getControllerName(req: any): string {
  return req.path.match(/\/(.*?)\//)[1]
}
