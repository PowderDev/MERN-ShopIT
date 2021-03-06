const ErrorHandler = require('../utils/ErrorHandler')

module.exports = (err, req, res, next) =>{

    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal Server Error'

    if(process.env.NODE_ENV === "DEVELOPMENT"){
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV === "PRODUCTION"){
        let error = {...err};

        error.message = err.message
        
        if(err.name === 'CastError'){
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        if(error.statusCode === 404){
            const message = `Not found.`
            error = new ErrorHandler(message, 404)
        }

        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(val => val.message)
            error = new ErrorHandler(message, 400)
        }

        if(error.statusCode === 11000){
            const message = `Dublicate ${Object.keys(err.keyValue)} entered` 
            error = new ErrorHandler(message, 400)
        }

        if(err.name === 'JsonWebTokenError'){
            const message = `JSON web Token is invalid. Try again`
            error = new ErrorHandler(message, 400)
        }

        if(err.name === 'TokenExpiresError'){
            const message = `JSON web Token is expired. Try again`
            error = new ErrorHandler(message, 400)
        }


        res.status(err.statusCode).json({
            success: false,
            errorMessage: error.message
        })
    }   


}