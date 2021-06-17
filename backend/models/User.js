import mongoose from 'mongoose';
const { Schema } = mongoose;
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const options = {
    errorMessages: {
        UserExistsError:
            'The username provided is already registered. Please try logging in, or use another username.'
    }
};
userSchema.plugin(passportLocalMongoose, options);

userSchema.post('save', (error, doc, next) => {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Email is already associated with an account.'));
    } else {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

export default User;
