const sendgrid = require('nodemailer-sendgrid-transport')
const resetEmail = require('../resetEmail')
const node_mailer = require('nodemailer')
const catchAsyncError = require('express-async-handler')

const sendEmail = catchAsyncError( async options =>{
    const transporter = node_mailer.createTransport(sendgrid({
    auth: {api_key: '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'}
}))

    await transporter.sendMail(resetEmail(options.email, options.resetUrl))
})

module.exports = sendEmail