import generateToken from '../../utils/generateToken.js'

const UserLoginService = async (req, res, next, Model) => {
    const { email, password } = req.body

    // looking for the user
    try {
        const user = await Model.findOne({ email })

        if (!user) {
            return next(new ErrorResponse('User not found', 400))
        }

        const isMatch = await user.isMatchPassword(password)
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid email or password',
            })
        }

        generateToken(res, user._id)
        const userWithoutPassword = { ...user.toObject(), password: undefined }

        res.status(200).json({ message: 'Success', user: userWithoutPassword })
    } catch (error) {
        next(error)
    }
}

export default UserLoginService
