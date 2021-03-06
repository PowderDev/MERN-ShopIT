const { Router } = require('express')
const router = Router()
const { isAuthenticated, isAdmin } = require('../utils/auth')
const { createOrder, getOrderById, updateOrder, getUserOrders, getAllOrders, updateOrderToDelivered } = require('../controllers/orderController')

router.route('/').post( isAuthenticated, createOrder )
router.route('/:id').get( isAuthenticated, getOrderById)
router.route('/:id/pay').put( isAuthenticated, updateOrder)
router.route('/myorders/:id').get( isAuthenticated, getUserOrders)
router.route('/').get(isAuthenticated, isAdmin, getAllOrders)
router.route('/:id/delivered').put(isAuthenticated, isAdmin, updateOrderToDelivered)

module.exports = router