import bcrypt from 'bcryptjs'
import { Schema, model } from 'mongoose'
import validateEmail from '../utils/validateEmail.js'

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            min: [3, 'Username must be at least 3 characters'],
            max: [25, 'Username cannot be more than 25 characters'],
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please fill a valid email address',
            ],
        },
        password: {
            type: String,
            min: [8, 'Password must be at least 8 characters'],
            max: [16, 'Password must be at least 16 characters'],
            required: true,
        },
        role: {
            type: String,
            enum: ['customer', 'manager', 'admin'],
            default: 'customer',
        },
    },
    {
        timestamps: true,
    }
)

// Match user entered password to hashed password in database
userSchema.methods.isMatchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = model('User', userSchema)

export default User
