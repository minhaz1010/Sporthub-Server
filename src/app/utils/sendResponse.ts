import { Response } from "express";

type TResponse<T> = {
  success?: true;
  statusCode: number;
  length?: number;
  message: string;
  result: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: true,
    totalItem: data.length,
    statusCode: data.statusCode,
    message: data.message,
    data: data.result,
  });
};

export default sendResponse;
