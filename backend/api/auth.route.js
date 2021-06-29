import express from 'express';
import passport from 'passport';
import AuthCtrl from './auth.controller.js';
import { auth } from '../utils/middleware.js';

const router = express.Router();

router.route('/').get(auth, AuthCtrl.apiGetUser);

router.route('/login').post(
    passport.authenticate('local', {
        failureFlash: true
    }),
    AuthCtrl.apiLoginUser
);

router.route('/register').post(AuthCtrl.apiRegisterUser);

router.route('/logout').get(AuthCtrl.apiLogoutUser);

export default router;
