import express from 'express';
import passport from 'passport';
import { check } from 'express-validator';
import AuthCtrl from './auth.controller.js';
import { auth } from '../utils/middleware.js';

const router = express.Router();

router.route('/').get(auth, AuthCtrl.apiGetUser);

router
    .route('/register')
    .post(
        [
            check(
                'username',
                'Please enter a username with 3 or more characters'
            ).isLength({ min: 3 }),
            check(
                'email',
                'Please include a valid email, ex: janedoe@gmail.com'
            ).isEmail(),
            check(
                'password',
                'Please enter a password with 6 or more characters'
            ).isLength({ min: 6 })
        ],
        AuthCtrl.apiRegisterUser
    );

router.route('/login').post(
    passport.authenticate('local', {
        failureFlash: true
    }),
    AuthCtrl.apiLoginUser
);

export default router;
