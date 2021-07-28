import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const db = process.env.MONGO_DB_URI;

console.log(db);

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            poolSize: 50
        });
        console.log('CONNECTED TO MONGO...');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export default connectDB;
