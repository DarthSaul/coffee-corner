import express from 'express';
import AuthCtrl from './auth.controller.js';

const router = express.Router();

router.route('/register').post(AuthCtrl.apiRegisterUser);

export default router;
