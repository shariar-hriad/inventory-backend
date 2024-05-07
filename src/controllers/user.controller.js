import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'
import UserCreateService from '../services/user/UserCreateService.js'
import UserDetailsService from '../services/user/UserDetailsService.js'

/**
 * @desc Register a new user
 * @route POST api/users/register
 * @access Public
 */

const register = asyncHandler(async (req, res, next) => {
    await UserCreateService(req, res, next, User)
})

/**
 * @desc Get user information
 * @route GET api/users/profile:id
 * @access Private
 */
const getUser = asyncHandler(async (req, res, next) => {
    await UserDetailsService(req, res, next, User)
})

export { getUser, register }
