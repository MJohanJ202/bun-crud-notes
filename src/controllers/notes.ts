import { Request, Response } from "express"
import { Notes } from '../models/notes'
import { wrapperController } from '../utils/httpError'
import { response } from '../utils/response'

const getNotesAll = async (req: Request, res: Response) => {
  const notes = await Notes.getAll()
  response({ res, statusCode: 200, success: true, info: notes })
}

const getNoteById = async (req: Request, res: Response) => {
  const { id } = req.params
  const findNote = await Notes.getById(id)

  if (!findNote) {
    const errorMessage = `Note with id ${id} not found`
    return response({ errorMessage, res, statusCode: 404, success: false })
  }

  response({ res, statusCode: 200, success: true, info: findNote })
}

const createNote = async (req: Request, res: Response) => {
  const { body } = req
  await Notes.create(body)
  response({ res, statusCode: 201 })
}

const updateNoteById = async (req: Request, res: Response) => {
  const { params, body } = req
  const { id } = params
  const updateNote = await Notes.updateById(id, body)

  if (!updateNote) {
    const errorMessage = `Could not find note with id ${id}`
    return response({ errorMessage, res, statusCode: 404, success: false })
  }

  response({ res, statusCode: 200, success: true, info: updateNote })
}
const removeNoteById = async (req: Request, res: Response) => {
  const { id } = req.params
  const deleteNote = await Notes.deleteById(id)

  if (!deleteNote) {
    const errorMessage = `cannot delete note with ${id}`
    return response({ res, statusCode: 404, success: false, errorMessage })
  }

  response({ res, statusCode: 204, })
}

export const allNotes = wrapperController(getNotesAll)
export const oneNoteById = wrapperController(getNoteById)
export const create = wrapperController(createNote)
export const updateOne = wrapperController(updateNoteById)
export const deleteOne = wrapperController(removeNoteById)
