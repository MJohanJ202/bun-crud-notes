import express, { NextFunction, Request, Response } from "express"
import { checkOrigin } from './middlewares/cors'
import { router as routerNotes } from './routes/notes'
import { errorClient } from './utils/errorClient'
import { response } from './utils/response'
import { error } from './utils/responseError'

export const app = express()


app.disable('x-powered-by')
app.use(express.json())
app.use(checkOrigin())

app.use('/api/notes', routerNotes)

//* -- -- == * default route* ==
app.use((req: Request, res: Response) => {
  const errorMessage = `The requested path ${req.path} not found`
  response({ res, statusCode: 404, errorMessage, })
})

//* error route
app.use((err: errorClient, req: Request, res: Response, next: NextFunction) => {
  error({
    res,
    success: false,
    statusCode: err.statusCode,
    description: err.message,
    path: req.path,
    method: req.method,
    url: req.originalUrl
  })
  next()
})
