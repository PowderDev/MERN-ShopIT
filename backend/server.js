const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./mongoDB')
const cookie_parser = require('cookie-parser')
const morgan = require('morgan')
const path = require('path')

dotenv.config()
connectDB()
const app =express()
app.use(express.json())
app.use(cookie_parser())
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'DEVELOPMENT'){
    app.use(morgan('dev'))
}


//Routes
const productRoutes = require('./routes/products')
const userRoutes = require('./routes/user')
const orderRoutes = require('./routes/order')
const uploadRoutes = require('./routes/upload')

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)


//Middlewares
const errorsHandler = require('./middlewares/error')
const catchAsyncErrors = require('./middlewares/catchAsyncErrors')

app.use(errorsHandler)
app.use(catchAsyncErrors)

app.listen(process.env.PORT, () =>{
    console.log(`Server is runnig in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
})
