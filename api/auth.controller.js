import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { validationResult } from 'express-validator';

import UserDAO from '../dao/userDAO.js';

export default class AuthController {
    static async apiGetUser(req, res, next) {
        try {
            const user = await UserDAO.getUser(req.user.id);
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }

    static async apiRegisterUser(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
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
            console.error(err);
            return res.status(401).json({ error: err.message });
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
