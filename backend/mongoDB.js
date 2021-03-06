const mongoose = require('mongoose')

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect('mongodb+srv://God:qb8GY1KVHz7tlpba@shopit.pq9zf.mongodb.net/ShopIT', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch(err) {
        console.log(err.message);
        process.exit(1)
    }
}

module.exports = connectDB