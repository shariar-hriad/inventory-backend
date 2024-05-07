import mongoose from 'mongoose'

const isValidObjectId = (id, next) => {
    return mongoose.Types.ObjectId.isValid(id)
}

export default isValidObjectId
