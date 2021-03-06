const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const ErrorHandler = require('../utils/ErrorHandler')
const sendToken = require('../utils/jwt')
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')

exports.register = asyncHandler( async (req, res) =>{
    const { email, password, name } = req.body

    const userExist = await User.findOne({ email })

    if (userExist){
        res.status(400)
        throw new ErrorHandler('User already exists', 400)
    }

    const user = await User.create({
        name, email, password
    })

    if (user){
        sendToken(user, 200, res)
        req.user = user
    } else{
        res.status(400)
        throw new ErrorHandler('Invalid user data', 400)
    }
})

exports.login = asyncHandler( async (req, res) =>{
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if(user){
        if( await user.comparePassword(password)){
            sendToken(user, 200, res)
            req.user = user
        } else{
            res.status(400)
            throw new ErrorHandler('Invalid password', 400)
        }
    } else{
        res.status(400)
        throw new ErrorHandler('Invalid email', 400)
    }
})

exports.logout = asyncHandler (async (req, res) =>{
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    req.user = undefined

    res.json({
        success: true,
        message: 'Logged out'
    })
})

exports.getUserProfile = asyncHandler( async (req, res) =>{
    const user = await User.findById(req.user._id)
    if(user){
        res.json({ user })
    } else{
        res.status(404)
        throw new ErrorHandler('User not found')
    }
})

exports.updateUserProfile = asyncHandler( async (req, res) =>{
    const user = await User.findById(req.user._id)
    const {name, email, password, newPassword} = req.body

    if(user){
        user.name = name || user.name
        user.email = email || user.email
        if (password){
            if(user.comparePassword(password)){
                user.password = newPassword
            }
        }

        const updatedUser = await user.save()
        res.json({ updatedUser })
    } else{
        res.status(404)
        throw new ErrorHandler('User not found')
    }
})

exports.getUsers= asyncHandler( async (req, res) =>{
    const users = await User.find()
    res.json( users )
})

exports.deleteUser= asyncHandler( async (req, res) =>{
    const user = await User.findById(req.params.id)
    
    if(user){
        await user.remove()
        res.json({
            success: true
        })
    } else{
        res.status(404)
        throw new ErrorHandler('User not found')
    }
})

exports.updateUser = asyncHandler( async (req, res) =>{
    const user = await User.findById(req.params.id)
    const {name, email, isAdmin} = req.body

    if(user){
        user.name = name || user.name
        user.email = email || user.email
        user.isAdmin = isAdmin 

        const updatedUser = await user.save()
        res.json({ updatedUser })
    } else{
        res.status(404)
        throw new ErrorHandler('User not found')
    }
})

exports.getUser = asyncHandler (async (req, res) =>{    
    const user = await User.findById(req.params.id)

    if(user){
        res.json({ user })
    } else{
        res.status(404)
        throw new ErrorHandler('User not found')
    }
})

exports.forgotPassword = asyncHandler( async (req, res, next) =>{
    const user = await User.findOne({ email: req.body.email })

    if (!user){
        return next(new ErrorHandler('Invalid email', 404))
    }

    const resetToken = user.getResetToken()
    await user.save({ validateBeforeSave: false })

    const resetUrl = `localhost:3000/reset/${resetToken}`
    


    try{
        await sendEmail({
            email: user.email,
            resetUrl
        })

        res.json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
    } catch(err){
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(err.message, 500))
    }
})

exports.resetPassword = asyncHandler( async (req, res, next) =>{
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } })

    if (!user){
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmpassword){
        return next(new ErrorHandler('Password does not match', 400))
    }

    user.password = req.body.password

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()
    req.user = user
    sendToken(user, 200, res)
})