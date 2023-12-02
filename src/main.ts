import { initDb } from './config/db/mongo'
import { app } from './server'
import { findAvailablePort } from './utils/freePort'

const PORT = Number(process.env.PORT) || 5001
const HOST_NAME = process.env.HOST_NAME || 'localhost'

//-- -- -- --
findAvailablePort(PORT).then(async (port: number) => {
  app.listen(port, HOST_NAME, () => {
    console.log(`Server running at http://${HOST_NAME}:${port}/`)
  })

  //-- -- -- --
  await initDb()
})

// --- ---
process.on("uncaughtException", (err: Error) => {
  console.log(err.name, err.message)
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...")
  process.exit(1)
})

// --- ---
process.on("unhandledRejection", (reason: Error, _promise: Promise<any>) => {
  console.log(reason.name, reason.message)
  console.log("UNHANDLED REJECTION! 💥 Shutting down...")
  process.exit(1)
})
