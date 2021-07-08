import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import UserDAO from '../dao/userDAO.js';

export default class AuthController {
    static async apiGetUser(req, res, next) {
        try {
            const user = await UserDAO.getUser(req.user.id);
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
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
                const payload = {
                    user: {
                        id: registerUser.id
                    }
                };
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: 360000 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({ token });
                    }
                );
            });
        } catch (err) {
            console.error(err.messsage);
            return res.status(401).send(err.message);
        }
    }

    static async apiLoginUser(req, res, next) {
        const payload = {
            user: {
                id: req.user.id
            }
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    }
}
