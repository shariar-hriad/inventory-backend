import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import connectDB from './config/connectDB.js'
import { errorHandler, notFound } from './middleware/error.middleware.js'
import customerRoute from './routes/customer.route.js'
import userRoute from './routes/user.route.js'

dotenv.config()

connectDB()

export const port = process.env.PORT || 8080

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

app.use('/api/users', userRoute)
app.use('/api/customer', customerRoute)

app.use(notFound)
app.use(errorHandler)

export default app
