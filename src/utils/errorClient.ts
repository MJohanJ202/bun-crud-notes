export class errorClient extends Error {
  statusCode: number
  constructor(
    {
      statusCode = 400,
      message = 'something happened operation error'
    }:
      { statusCode?: number, message?: string } = {}) {
    message = message || 'something happened operation error'
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}
