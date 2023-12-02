import { Response } from 'express'

export function response({
  errorMessage,
  res,
  info,
  success,
  statusCode
}: {
  errorMessage?: string,
  info?: unknown,
  res: Response,
  success?: boolean,
  statusCode: number
}) {
  if (!errorMessage && !info && !success) {
    res.status(statusCode).end()
    return
  }

  if (!statusCode) {
    res.status(500).end()
    return
  }

  res.status(statusCode).json({
    success,
    info,
    errorMessage
  })
}
