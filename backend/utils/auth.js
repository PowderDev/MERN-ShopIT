const catchAsyncError = require('express-async-handler')
const ErrorHandler = require('../utils/errorHandler')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.isAuthenticated = catchAsyncError( async (req, res, next) =>{
    const { token } = req.cookies

    if (!token){
        return next(new ErrorHandler('Login first to access this resource', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)

    next()
})


exports.isAdmin = (req, res, next) =>{
    if(req.user && req.user.isAdmin){
        next()
    } else{
        res.status(401)
        throw new ErrorHandler('Not authorized as an admin')
    }
}