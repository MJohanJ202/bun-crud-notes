import { NextFunction, Request, Response } from 'express';
import { errorClient } from './errorClient';

export function wrapperController(
  controller: (req: Request, res: Response) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      controller(req, res)
    }
    catch (err) {
      //@ts-ignore
      console.log(`somethings wrong in the server,error occasioned by controllers or database${err.message}, on the method ${req.method} and route ${req.originalUrl}`)
      //@ts-ignore
      next(new errorClient(err.statusCode, err.message))
    }
  }
}
