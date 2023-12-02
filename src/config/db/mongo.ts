import mongoose from 'mongoose'

const DB_URI = process.env.DB_URI ?? ''

export const initDb = async () => {
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(DB_URI)
    console.log('✅🟢 Database connected successfully 🤖')
  } catch (err) {
    console.error(`❌🔴 Error connecting to database ${err} 🤖`)
  }
}
