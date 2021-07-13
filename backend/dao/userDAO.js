import User from '../models/User.js';

export default class UserDAO {
    static async getUser(id) {
        try {
            const user = await User.findById(id).select('-password');
            return { user };
        } catch (err) {
            console.error(err);
            return { error: err.message };
        }
    }
    static async registerUser(email, username, password) {
        try {
            const newUser = new User({ email, username });
            const registerUser = await User.register(newUser, password);
            return { registerUser };
        } catch (err) {
            console.error(err);
            return { error: err.message };
        }
    }
    static async updateUser(id, { email, username }) {
        try {
            const user = await User.findById(id).select('-password');
            if (username) {
                user.username = username;
                await user.save();
            }
            if (email) {
                user.email = email;
                await user.save();
            }
            return { user };
        } catch (err) {
            console.error(err);
            return { error: err.message };
        }
    }
}
