import express from 'express'
import path from 'path'
import logger from 'morgan'
import users from './routes/users'
import { connectMongoose } from './utils/mongoose'
import middlewares from './middlewares'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 8080

try {
  connectMongoose()

  const app = express()

  app.set('secretKey', 'healthplans')

  app.use(logger('dev'))
  app.use(express.json())

  const clientDistPath = path.join(__dirname, '..', '..', 'client', 'dist')
  app.use(express.static(path.join(clientDistPath)))
  app.get('/', function (_, response) {
    response.sendFile(path.join(clientDistPath, 'index.html'))
  })

  app.get('/favicon.ico', function (_, response) {
    response.sendStatus(204)
  })

  app.use('/user', users)

  app.use(middlewares.notFound)
  app.use(middlewares.errorHandler)

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
  })
} catch (error) {
  console.log('opaaa')
  console.error(error)
}
