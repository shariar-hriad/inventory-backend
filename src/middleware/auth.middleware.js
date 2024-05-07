import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import ErrorResponse from '../utils/errorResponse.js'

const protect = asyncHandler(async (req, res, next) => {
    let token

    token = req.cookies.access_token

    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

            req.user = await User.findById(decodedToken.userId).select(
                '-password'
            )
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            return next(new ErrorResponse('Not authorized, token failed'))
        }
    } else {
        res.status(401)
        return next(new ErrorResponse('Not authorized,'))
    }
})

const authorize = (...roles) =>
    asyncHandler(async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(
                    `User role ${req.user.role} is not authorized to access this route`,
                    403
                )
            )
        }
        next()
    })

export { authorize, protect }
