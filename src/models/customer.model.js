import { Schema, model } from 'mongoose'

const customerSchema = new Schema(
    {
        name: {
            type: String,
            min: [3, 'Username must be at least 3 characters'],
            max: [25, 'Username cannot be more than 25 characters'],
            required: true,
        },
        phoneNumber: {
            type: String,
            unique: true,
            required: true,
        },
        address: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const Customer = model('Customer', customerSchema)

export default Customer
