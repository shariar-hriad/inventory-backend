import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'
import UserLoginService from '../services/user/UserLoginService.js'

/**
 * @desc Login user
 * @route POST /users/auth
 * @access Public
 */
const login = asyncHandler(async (req, res, next) => {
    await UserLoginService(req, res, next, User)
})

/**
 * @desc Logout user
 * @route POST /users/auth
 * @access Public
 */
const logout = asyncHandler(async (req, res, next) => {
    res.cookie('access_token', '', {
        httpOnly: true,
        expires: new Date(0),
    })

    res.status(200).json({ message: 'Logout successfully' })
})

export { login, logout }
