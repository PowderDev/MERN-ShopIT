const Order = require('../models/order')
const asyncHandler = require('express-async-handler')
const ErrorHandler = require('../utils/ErrorHandler')
const mongoose = require('mongoose')

exports.createOrder = asyncHandler( async (req, res) =>{
    const { orderItems, shippingInfo, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

    if ( orderItems && orderItems.length === 0){
        res.status(400)
        throw new ErrorHandler('No order items')
    } else{
        const order = new Order({ user: req.user._id, orderItems, shippingInfo, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice })

        const createOrder = await order.save()
        res.status(201).json({
            createOrder
        })
    }

})

exports.getOrderById = asyncHandler( async (req, res) =>{
    const id = req.params.id
    const order = await Order.findById(id).populate('user', 'name email')
    if (order){
        // if (order.user.email !== req.user.email){
        //     res.status(400)
        //     throw new ErrorHandler('This order belongs to another user', 400)
        // }
        res.json({
            order
        })
    } else{
        res.status(404)
        throw new ErrorHandler('Order not found', 404)
    }


})

exports.updateOrder = asyncHandler( async (req, res) =>{
    const id = req.params.id
    const order = await Order.findById(id)
    if (order){

        order.isPaid = true
        order.paidAt = Date.now()
        
        const updatedOrder = await order.save()
        res.json({
            updatedOrder
        })

    } else{
        res.status(404)
        throw new ErrorHandler('Order not found', 404)
    }
})

exports.getUserOrders = asyncHandler( async (req, res) =>{
    const userId = mongoose.Types.ObjectId(req.params.id)
    const orders = await Order.find({user: userId})
    res.json(orders)
})

exports.getAllOrders = asyncHandler( async (req, res) =>{
    const orders = await Order.find().populate('user', 'name')
    res.json(orders)
})

exports.updateOrderToDelivered = asyncHandler( async (req, res) =>{
    const id = req.params.id
    const order = await Order.findById(id)
    if (order){

        order.isDelivered = true
        order.deliveredAt = Date.now()
        
        const updatedOrder = await order.save()
        res.json({
            updatedOrder
        })

    } else{
        res.status(404)
        throw new ErrorHandler('Order not found', 404)
    }
})