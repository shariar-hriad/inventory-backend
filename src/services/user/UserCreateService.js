import ErrorResponse from '../../utils/errorResponse.js'
import generateToken from '../../utils/generateToken.js'

const UserCreateService = async (req, res, next, Model) => {
    const { email } = req.body

    // checking for existing users
    const isExistingUser = await Model.findOne({ email })

    if (isExistingUser) {
        return next(new ErrorResponse('User already exists.', 400))
    }

    const user = await Model.create(req.body)
    if (user) {
        generateToken(res, user._id)

        res.status(201).json({
            message: 'User created successfully',
        })
    } else {
        return next(new ErrorResponse('Invalid username or password', 400))
    }
}

export default UserCreateService
