import mongoose from 'mongoose';
const { Schema } = mongoose;

const brewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    weights: {
        coffee: String,
        waterRatio: String
    },
    grindType: String,
    items: [String]
});

const BrewMethod = mongoose.model('BrewMethod', brewSchema);

export default BrewMethod;
