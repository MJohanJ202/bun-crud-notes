import { createServer } from "node:net"

export const findAvailablePort = (desirePort = 0) => {
  return new Promise<number>((resolve, reject) => {
    const server = createServer()
    server.listen(desirePort, () => {
      //@ts-ignore
      const available = server.address().port
      server.close(() => resolve(available))
    })
    server.on("error", (err) => {
      //@ts-ignore
      if (err.code === 'EADDRINUSE')
        return findAvailablePort(0).then(port => resolve(port))
      reject(`${err} { message: 'No available ports found' }`)
    })
  })
}
