import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // Format the response based on the exception type
    let responseBody = {
      status: false,
      message: exception.message,
      data: null,
    };

    if (status === HttpStatus.BAD_REQUEST && exception.getResponse()) {
      const exceptionResponse = exception.getResponse() as any;
      responseBody.message = Array.isArray(exceptionResponse.message)
        ? exceptionResponse.message?.join(', ')
        : exceptionResponse.message;
    }

    response.status(status).json(responseBody);
  }
}
