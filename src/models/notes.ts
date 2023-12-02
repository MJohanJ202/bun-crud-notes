import { Schema, model } from "mongoose"
import { note, partialNote } from '../schemas/notes'

const noteSchema = new Schema(
  {
    name: { type: String },
    message: { type: String },
    date: { type: Date },
    status: { type: Boolean },
    tags: { type: [String] },
    userName: { type: String },
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const noteModel = model('Notes', noteSchema)

export class Notes {
  static async getAll() {
    return await noteModel.find().sort({ createdAt: -1 })
  }
  static async getById(id: string) {
    return await noteModel.findOne({ _id: id })
  }
  static async create(note: note) {
    await noteModel.create(note)
  }
  static async updateById(id: string, partialNote: partialNote) {
    return await noteModel.findByIdAndUpdate(id, partialNote, {
      new: true
    })
  }

  static async deleteById(id: string) {
    return await noteModel.deleteOne({ _id: id })
  }
}
