import User from '../models/User.js';

export default class UserDAO {
    static async getUser(id) {
        try {
            const user = await User.findById(id).select('-password');
            return { user };
        } catch (err) {
            console.error(err.message);
            return { error: err.message };
        }
    }
    static async registerUser(email, username, password) {
        try {
            const newUser = new User({ email, username });
            const registerUser = await User.register(newUser, password);
            return { registerUser };
        } catch (err) {
            console.error(err.message);
            return { error: err.message };
        }
    }
    static async getProfile(id) {
        try {
            const user = await User.findById(id).select('-password');
            const { profile } = user;
            return { profile };
        } catch (err) {
            console.error(err.message);
            return { error: err.message };
        }
    }
    static async createProfile(id, profileData) {
        try {
            const user = await User.findById(id).select('-password');
            user.profile = profileData;
            await user.save();
            return user.profile;
        } catch (err) {
            console.error(err);
        }
    }
    static async updateProfile(id, profileData) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                id,
                {
                    profile: profileData
                },
                { new: true }
            ).select('-password');
            return updatedUser.profile;
        } catch (error) {
            console.error(err);
        }
    }
}
