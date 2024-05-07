import { body, check } from 'express-validator'

const registerValidation = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3, max: 25 })
        .withMessage('Username should be between 3 and 25 characters'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password should be at least 8 characters long'),
    check('role')
        .isIn(['admin', 'manager', 'customer'])
        .withMessage('Invalid user role'),
]

export { registerValidation }
