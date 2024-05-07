import ErrorResponse from '../../utils/errorResponse.js'
import isValidObjectId from '../../utils/isValidObjectId.js'

const UpdateService = async (req, res, next, Model) => {
    try {
        const { id } = req.params
        const { body: postBody } = req

        isValidObjectId(id)
        if (!isValidObjectId)
            return next(new ErrorResponse('Invalid object id', 404))

        const data = await Model.updateOne({ _id: id }, postBody)

        return res.status(200).json({
            message: 'success',
            data,
        })
    } catch (error) {
        return next(error)
    }
}

export default UpdateService
