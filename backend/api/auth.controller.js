import UserDAO from '../dao/userDAO.js';

export default class AuthController {
    static async apiGetUser(req, res, next) {
        console.log(req.session);
    }
    static async apiRegisterUser(req, res, next) {
        const { email, username, password } = req.body;
        const { registerUser } = await UserDAO.registerUser(
            email,
            username,
            password
        );
        res.json(registerUser);
    }
    static async apiLoginUser(req, res, next) {
        res.json('Successfully logged in.');
    }
    static async apiLogoutUser(req, res, next) {
        req.logout();
        console.log('User logged out.');
    }
}
