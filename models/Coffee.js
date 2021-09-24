import mongoose from 'mongoose';
const { Schema } = mongoose;

const coffeeSchema = new Schema({
    distributor: String,
    name: String,
    origin: String,
    roastType: String,
    tags: [String],
    img: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Coffee = mongoose.model('Coffee', coffeeSchema);

export default Coffee;
