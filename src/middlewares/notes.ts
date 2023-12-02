import { NextFunction, Request, Response } from "express"
import { isObjectIdOrHexString } from 'mongoose'
import { confirmationBody, confirmationParams, verificationPartialBody } from '../schemas/notes'
import { response } from '../utils/response'

export function validationBody(req: Request, res: Response, next: NextFunction) {
  const { body } = req
  const validation = confirmationBody({ shape: body })

  if (!validation.success) {
    const errorMessage = JSON.parse(validation.error.message)
    return response({ statusCode: 400, res, success: false, errorMessage })
  }

  req.body = validation.data
  next()
}

export function validationPartialBody(req: Request, res: Response, next: NextFunction) {
  const { body } = req
  const validation = verificationPartialBody({ shape: body })
  const isEmptyPartialBody = !(Object.keys(body).length)

  if (isEmptyPartialBody) return response({ statusCode: 204, res, })

  if (!validation.success) {
    const errorMessage = JSON.parse(validation.error.message)
    return response({ statusCode: 422, res, success: false, errorMessage })
  }

  req.body = validation.data
  next()
}
export function validationParams(req: Request, res: Response, next: NextFunction) {
  const { params } = req
  const validation = confirmationParams({ shape: params })

  if (!validation.success) {
    const errorMessage = JSON.parse(validation.error.message)
    return response({ statusCode: 400, res, success: false, errorMessage })
  }

  const id = validation.data.id

  if (!isObjectIdOrHexString(id)) {
    const errorMessage = 'param id is incorrectly please send id valid'
    return response({ res, statusCode: 422, success: false, errorMessage })
  }

  req.params = validation.data
  next()
}
