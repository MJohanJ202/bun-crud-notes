import cors from "cors";
import { errorClient } from '../utils/errorClient';

const ACCEPTED_ORIGIN = [
  `http://localhost:1234`,
  `http://localhost:3000`,
  `http://localhost:8080`,
  `http://localhost:8081`,
]
export const checkOrigin = ({
  acceptedOrigins = ACCEPTED_ORIGIN
}: {
  acceptedOrigins?: string[]
} = {}) => cors({
  origin(requestOrigin, callback) {
    const hasOriginInWhiteList = acceptedOrigins.includes(requestOrigin ?? '/')

    if (hasOriginInWhiteList || !requestOrigin) return callback(null, true)

    return callback(new errorClient({ message: 'Not allowed by CORS', statusCode: 400 }))
  },
})

