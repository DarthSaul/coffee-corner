// import bcrypt from 'bcrypt';
import UserDAO from '../dao/userDAO.js';

export default class AuthController {
    static async apiGetUser(req, res, next) {
        const { id } = req.params;
        const { user } = await UserDAO.getUser(id);
        res.json(user);
    }
    static async apiRegisterUser(req, res, next) {
        const { email, username, password } = req.body;
        const { registerUser } = await UserDAO.registerUser(
            email,
            username,
            password
        );
        req.login(registerUser, err => {
            if (err) {
                return next(err);
            }
            res.json(registerUser);
        });
    }
    static async apiLoginUser(req, res, next) {
        res.json({
            success: true,
            message: 'Successfully logged in',
            user: req.user
        });
    }
    static async apiLogoutUser(req, res, next) {
        req.logout();
        res.json('User logged out.');
    }
}
