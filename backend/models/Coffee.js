import mongoose from 'mongoose';
const { Schema } = mongoose;

const coffeeSchema = new Schema({
    distributor: String,
    name: String,
    origin: String,
    roastType: String,
    tags: [String]
});

const Coffee = mongoose.model('Coffee', coffeeSchema);

export default Coffee;
