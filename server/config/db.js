const mongoose = require('mongoose');

let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    try{
        if (cached.conn) return cached.conn;
        mongoose.set('strictQuery', false);
        if(!cached.promise) {
            cached.promise = mongoose.connect(process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }).then((mongoose) => mongoose);
        }
        cached.conn = await cached.promise;
        console.log(`Database connected: ${cached.conn.connection.host}`);
        return cached.conn;
    }
    catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;