import mongoose from 'mongoose';
const { Schema } = mongoose;

const profileSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
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
