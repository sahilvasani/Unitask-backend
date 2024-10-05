import { HttpException } from '@nestjs/common';

export const sucessResponse = (message: string, data?: any) => {
  return {
    message,
    data,
    status: true,
  };
};

export const errorResponse = (error: any) => {
  throw new HttpException(
    {
      message: error.message,
      data: null,
      status: false,
    },
    error.status || 500,
  );
};
