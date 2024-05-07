import ErrorResponse from '../../utils/errorResponse.js'

const GetAllCustomerService = async (req, res, next, Model) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 2
        const skip = (page - 1) * limit

        // Parse search parameters
        const searchKeyword = req.query.search || ''

        // Build query conditions for search
        const query = {}
        if (searchKeyword) {
            query.$or = [
                { name: { $regex: searchKeyword, $options: 'i' } },
                { phoneNumber: { $regex: searchKeyword, $options: 'i' } },
            ]
        }

        const customers = await Model.find(query).skip(skip).limit(limit)
        if (!customers)
            return next(new ErrorResponse('Customer not found', 404))

        const totalCustomers = await Model.countDocuments(query)

        return res.status(200).json({
            message: 'Success',
            data: customers,
            pagination: {
                page,
                limit,
                totalCustomers,
            },
        })
    } catch (error) {
        next(error)
    }
}

export default GetAllCustomerService
