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
    items: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Schema.Types.Mixed
            }
        }
    ]
});

const BrewMethod = mongoose.model('BrewMethod', brewSchema);

export default BrewMethod;
