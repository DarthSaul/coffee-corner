import UserDAO from '../dao/userDAO.js';

export default class AuthController {
    static async apiRegisterUser(req, res, next) {
        const { email, username, password } = req.body;
        const { registerUser } = await UserDAO.registerUser(
            email,
            username,
            password
        );
        res.json(registerUser);
    }
}
