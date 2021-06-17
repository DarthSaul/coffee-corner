import express from 'express';
import passport from 'passport';
import AuthCtrl from './auth.controller.js';

const router = express.Router();

router.route('/').get(AuthCtrl.apiGetUser);

router.route('/register').post(AuthCtrl.apiRegisterUser);

router
    .route('/login')
    .post(
        passport.authenticate('local', { failureFlash: true }),
        AuthCtrl.apiLoginUser
    );

export default router;
