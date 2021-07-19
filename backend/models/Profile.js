import mongoose from 'mongoose';
const { Schema } = mongoose;

const avatarSchema = new Schema(
    {
        url: String,
        filename: String,
        originalname: String
    },
    { toJSON: { virtuals: true } }
);

// Move to frontend with Cloudinary SDK !!
avatarSchema.virtual('medium').get(function () {
    return this.url.replace('/upload', '/upload/w_500');
});
avatarSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_150');
});

const profileSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        avatar: avatarSchema,
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        location: {
            type: String
        },
        profileImage: {
            url: String,
            filename: String
        },
        social: {
            instagram: String
        },
        brewMethods: [
            {
                type: Schema.Types.ObjectId,
                ref: 'BrewMethod'
            }
        ],
        coffees: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Coffee'
            }
        ],
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        date: {
            type: Date,
            default: Date.now
        }
    },
    { toJSON: { virtuals: true } }
);

profileSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
