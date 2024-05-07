import asyncHandler from 'express-async-handler'
import Customer from '../models/customer.model.js'
import DeleteService from '../services/common/DeleteService.js'
import UpdateService from '../services/common/UpdateService.js'
import GetAllCustomerService from '../services/customer/GetAllCustomerService.js'

/**
 * @desc Create a new customer
 * @route POST /customer/create-customer
 * @access Pivate
 */
const createCustomer = asyncHandler(async (req, res, next) => {
    const customer = await Customer.create(req.body)

    res.status(201).json({
        message: 'Success',
        customer,
    })
})

/**
 * @desc Update a customer
 * @route POST /customer/update-customer/:id
 * @access Pivate
 */
const updateCustomerProfile = asyncHandler(async (req, res, next) => {
    await UpdateService(req, res, next, Customer)
})

/**
 * @desc Delete a customer
 * @route POST /customer/delete-customer/:id
 * @access Pivate
 */
const deleteCustomer = asyncHandler(async (req, res, next) => {
    await DeleteService(req, res, next, Customer)
})

/**
 * @desc Get all customer
 * @route GET /customer
 * @access Pivate
 */
const getAllCustomer = asyncHandler(async (req, res, next) => {
    await GetAllCustomerService(req, res, next, Customer)
})

export { createCustomer, deleteCustomer, getAllCustomer, updateCustomerProfile }
