import User from '../models/User.js';

export default class UserDAO {
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
