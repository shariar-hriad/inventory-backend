import { Router } from 'express'
import { login, logout } from '../controllers/auth.controller.js'
import { getUser, register } from '../controllers/user.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { registerValidation } from '../validation/user.validation.js'
import validate from '../validation/validate.js'

const userRoute = Router()

userRoute.post('/register', validate(registerValidation), register)
userRoute.post('/auth', login)
userRoute.get('/logout', logout)
userRoute.get('/profile', protect, getUser)

export default userRoute
