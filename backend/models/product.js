const { Schema, model } = require('mongoose')

const product = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true,
                default: ''
            },
            user: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    numInStock: {
        type: Number,
        required: true,
        default: 0
    },
}, {
    timestamps: true
})

product.methods.deleteReview = function(id){
    const reviews = this.reviews.reduce((acc, item) =>{
        if(item._id != id){
            acc.push(item)
        } else{
            console.log(item.name);
        }
        return acc
    }, [])
    return reviews

}

const Product = model('Product', product)

module.exports = Product