const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const user = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: [22, 'Your name cannot exeed 22 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Enter valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Your password must be longer than 6 characters']
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timestamps: true
})

user.pre('save', async function(next){
    if (!this.isModified('password')){
        next()
    }
    
    this.password = await bcrypt.hash(this.password, 10)
})

user.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}


user.methods.getJWT = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME 
    })
}

user.methods.getResetToken = function(){
    const resetToken = crypto.randomBytes(16).toString('hex')

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000
    
    return resetToken
}

module.exports = model('User', user)