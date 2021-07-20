import mongoose from 'mongoose';
const { Schema } = mongoose;
const postSchema = new Schema({
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: [
        {
            profile: {
                type: Schema.Types.ObjectId,
                ref: 'Profile'
            }
        }
    ],
    comments: [
        {
            text: {
                type: String,
                required: true
            },
            profile: {
                type: Schema.Types.ObjectId,
                ref: 'Profile'
            }
        }
    ]
});

const Post = mongoose.model('Post', postSchema);

export default Post;
