import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: String,
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
