const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const ErrorHandler = require('../utils/ErrorHandler')

exports.getAllProducts = asyncHandler( async (req, res) =>{
    const pageSize = 3
    const page = +req.query.page || 1


    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count =  await Product.countDocuments({ ...keyword })

    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
    
    res.json({
        products,
        page,
        pages: Math.ceil(count / pageSize)
    })
})

exports.getProductById = asyncHandler(async (req, res) =>{
    const id  = req.params.id
    const product = await Product.findById(id)

    if(product){
        res.json({
            product
        })
    } else{
        res.status(404).json({
            message: 'Product not found'
        })
    }
})

exports.deleteProduct = asyncHandler(async (req, res) =>{
    const id  = req.params.id
    const product = await Product.findById(id)

    if(product){
        product.remove()
        res.json({
            success: true
        })
    } else{
        res.status(404).json({
            message: 'Product not found'
        })
    }
})

exports.createProduct = asyncHandler(async (req, res) =>{
    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: 'https://www.techinn.com/f/13776/137769821/sony-ps5.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        numInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.json(createdProduct)
})

exports.updateProduct = asyncHandler(async (req, res) =>{
    const { name, price, description, image, brand, category, numInStock } = req.body

    const product = await Product.findById(req.params.id)

    if(product){

        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.numInStock = numInStock

        const updatedProduct = await product.save()
        res.json( updatedProduct )
    } else{
        res.status(404)
        throw new ErrorHandler('Product not found', 404)
    }

    const createdProduct = await product.save()
    res.json(product)
})

exports.createReview = asyncHandler(async (req, res) =>{
    const { rating, comment} = req.body

    const product = await Product.findById(req.params.id)

    if(product){
        const review = {
            name: req.user.name,
            rating: +rating,
            comment,
            user: req.user._id
        }   

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => acc += item.rating, 0) / product.reviews.length

        await product.save()
        res.send('Review added')
    } else{
        res.status(404)
        throw new ErrorHandler('Product not found', 404)
    }

    const createdProduct = await product.save()
    res.json(product)
})

exports.topRatedProducts = asyncHandler(async (req, res) =>{
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)
    res.json(products)
})

exports.deleteReview = asyncHandler(async (req, res) =>{
    const id  = req.params.id
    const reviewId = req.params.reviewid
    const product = await Product.findById(id)

    if(product){
        product.reviews = product.deleteReview(reviewId)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => acc += item.rating, 0) / product.reviews.length

        await product.save()
        res.json({
            success: true
        })
    } else{
        res.status(404).json({
            message: 'Product not found'
        })
    }
})