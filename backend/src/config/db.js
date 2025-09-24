import mongoose from 'mongoose';

const connectDb = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch(error){
        console.error('DB connection failed!', error);
        process.exit(1);
    }

}

export default connectDb;
