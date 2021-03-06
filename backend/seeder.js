const Product = require('./models/product')
const User = require('./models/user')
const dotenv = require('dotenv')
const connectDB = require('./mongoDB')
const users = require('./data/users')
const products = require('./data/products')

dotenv.config()

connectDB()

const importData = async() =>{
    try{
        await Product.deleteMany()
        await User.deleteMany()

        const createUsers = await User.insertMany(users)

        const admin = createUsers[0]._id
        const dataProducts = products.map(product =>{
            return {...product, user: admin}
        })

        await Product.insertMany(dataProducts)

        process.exit()
    } catch(err){
        console.log(err.message);
        process.exit(1)
    }
}

importData()
