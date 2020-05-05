import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { ErrorMessage } from '@constants/error.enum'
import BussinessException from '@exceptions/bussiness.exception'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    let message = exception.message
    let status = HttpStatus.INTERNAL_SERVER_ERROR
    if (exception instanceof HttpException) {
      status = exception.getStatus()
    }
    let code: number = status
    if (exception instanceof BussinessException) {
      code = exception.code
    }

    // 非开发环境不展示错误详细内容
    if (status === 500 && process.env.NODE_ENV !== 'development') {
      message = ErrorMessage.INTERNAL_EXCEPTION
    }

    const errorResponse: any = {
      data: {
        message,
      },
      code,
      success: false,
    }

    if (!(exception instanceof BussinessException)) {
      errorResponse.url = request.raw.url
    }

    response.status(status)
    response.header('Content-Type', 'application/json; charset=utf-8')
    response.send(errorResponse)
  }
}
