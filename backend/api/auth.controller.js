import UserDAO from '../dao/userDAO.js';

export default class AuthController {
    static async apiGetUser(req, res, next) {
        const { id } = req.params;
        const { user } = await UserDAO.getUser(id);
        res.json(user);
    }
    static async apiRegisterUser(req, res, next) {
        try {
            const { email, username, password } = req.body;
            const { registerUser, error } = await UserDAO.registerUser(
                email,
                username,
                password
            );
            if (error) {
                throw new Error(error);
            }
            req.login(registerUser, err => {
                if (err) {
                    return next(err);
                }
                res.json(registerUser);
            });
        } catch (error) {
            return res.status(401).send(error.message);
        }
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
