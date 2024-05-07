import { body } from 'express-validator'

const createCustomerValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Customer name is required')
        .isLength({ min: 2, max: 20 })
        .withMessage('Customer name should be between 3 and 25 characters'),
    body('phoneNumber')
        .trim()
        .notEmpty()
        .withMessage('Customer phone number is required'),
    body('address').trim(),
]

export default createCustomerValidation
