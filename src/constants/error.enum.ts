export enum ErrorCode {
  TIMEOUT = -1,
  USER_DUPLICATE = 1000,
  EMAIL_DUPLICATE = 1001,
  EMAIL_SIGN_INVALID = 1002,
  EMAIL_VALID_FAILURE = 1003,
  LOGIN_FAILURE = 1004,
  BAD_REQUEST = 400,
  INTERNAL_EXCEPTION = 500,
}

export enum ErrorMessage {
  TIMEOUT = '请求超时',
  USER_DUPLICATE = '用户名被占用',
  EMAIL_DUPLICATE = '邮箱被占用',
  EMAIL_SIGN_INVALID = '邮箱验证失效',
  EMAIL_VALID_FAILURE = '邮箱验证失败',
  LOGIN_FAILURE = '账号或密码错误',
  BAD_REQUEST = '参数错误',
  INTERNAL_EXCEPTION = '系统内部异常',
}
