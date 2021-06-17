import User from '../models/User.js';

export default class UserDAO {
    static async getUser(id) {
        try {
            const user = await User.findById(id).select('-password');
            return { user };
        } catch (err) {
            console.error(err);
        }
    }
    static async registerUser(email, username, password) {
        try {
            const newUser = new User({ email, username });
            const registerUser = await User.register(newUser, password);
            return { registerUser };
        } catch (err) {
            console.error(err);
        }
    }
}
