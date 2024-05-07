import { Router } from 'express'
import {
    createCustomer,
    deleteCustomer,
    getAllCustomer,
    updateCustomerProfile,
} from '../controllers/customer.controller.js'
import { authorize, protect } from '../middleware/auth.middleware.js'
import createCustomerValidation from '../validation/customer.validation.js'
import validate from '../validation/validate.js'

const customerRoute = Router()

customerRoute.get('/', protect, authorize('admin'), getAllCustomer)
customerRoute.post(
    '/create-customer',
    protect,
    authorize('admin'),
    validate(createCustomerValidation),
    createCustomer
)
customerRoute.post(
    '/update-customer/:id',
    protect,
    authorize('admin'),
    updateCustomerProfile
)
customerRoute.delete(
    '/delete-customer/:id',
    protect,
    authorize('admin'),
    deleteCustomer
)

export default customerRoute
