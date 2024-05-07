import ErrorResponse from '../../utils/errorResponse.js'

const UserDetailsService = async (req, res, next, Model) => {
    try {
        const userId = req.user._id

        const user = await Model.findById(userId).select('-password')
        if (!user) {
            return next(new ErrorResponse('401', 'Unauthorized'))
        }

        return res.status(200).json({
            message: 'Success',
            user,
        })
    } catch (error) {
        next(error)
    }
}

export default UserDetailsService
