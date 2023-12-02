import { Response } from 'express';
export function error({
  description,
  method,
  path,
  res,
  success,
  statusCode,
  url
}: {
  description: string
  method: string,
  path: string,
  res: Response,
  success: boolean,
  statusCode: number
  url: string
}) {
  res.status(statusCode).json({
    description,
    data: null,
    method,
    path,
    success,
    statusCode,
    url
  })
}
