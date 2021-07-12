import mongoose from 'mongoose';
const { Schema } = mongoose;
import passportLocalMongoose from 'passport-local-mongoose';

const profileSchema = new Schema(
    {
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

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    profile: profileSchema
});

const options = {
    errorMessages: {
        UserExistsError:
            'The username provided is already registered. Please try logging in, or use another username.'
    }
};
userSchema.plugin(passportLocalMongoose, options);

userSchema.post('save', (error, doc, next) => {
    if (
        error.name === 'MongoError' &&
        error.code === 11000 &&
        error.keyValue.email
    ) {
        next(new Error('Email is already associated with an account.'));
    } else if (
        error.name === 'MongoError' &&
        error.code === 11000 &&
        error.keyValue.username
    ) {
        next(new Error('Username is unavailable. Please try another.'));
    } else {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

export default User;
