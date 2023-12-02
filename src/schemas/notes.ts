import { z } from 'zod'

const regexNotes = {
  userName: /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
}

const notes = z.object({
  name: z.string({
    required_error: 'title is needed for the task',
    invalid_type_error: 'title is by necessity a string'
  }).min(5, 'title to short').max(50, 'title to long'),
  message: z.string({
    required_error: 'message is require for the task',
    invalid_type_error: 'message can only be a string'
  }).min(10, 'message is too small').max(100, 'message is too long'),
  status: z.boolean().default(false),
  tags: z.array(z.enum(['ideas', 'routines', 'appointments', 'reminders', 'homeworks', 'others'])),
  userName: z.string({
    required_error: 'user name require to work correctly',
    invalid_type_error: 'user name needed to string'
  }).min(3, 'user name must be longer').max(30, 'user name must be shorter').regex(regexNotes.userName)
})

const partialNote = notes.partial()

const notesParamsSchema = z.object({
  id: z.string().min(24, 'Must be 24 or more characters long')
    .length(24, { message: "Must be exactly 24 characters long" })
})

export const confirmationBody = ({ shape }: { shape: unknown }) => {
  return notes.safeParse(shape)
}

export const confirmationParams = ({ shape }: { shape: unknown }) => {
  return notesParamsSchema.safeParse(shape)
}

export const verificationPartialBody = ({ shape }: { shape: unknown }) => {
  return partialNote.safeParse(shape)
}

export type note = z.infer<typeof notes>
export type partialNote = z.infer<typeof partialNote>
