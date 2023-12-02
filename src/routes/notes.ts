import { Router } from "express"
import { allNotes, create, deleteOne, oneNoteById, updateOne } from '../controllers/notes'
import { validationBody, validationParams, validationPartialBody } from '../middlewares/notes'

const router = Router()

router.get('/', allNotes)
router.get('/:id', validationParams, oneNoteById)
router.post('/', validationBody, create)
router.patch('/:id', validationParams, validationPartialBody, updateOne)
router.delete('/:id', validationParams, deleteOne)

export { router }
