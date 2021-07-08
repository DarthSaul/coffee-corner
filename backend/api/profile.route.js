import express from 'express';
import ProfileCtrl from './profile.controller.js';
import { auth } from '../utils/middleware.js';

const router = express.Router();

router.route('/').get(ProfileCtrl.apiGetProfile);
router.route('/create').post(auth, ProfileCtrl.apiCreateProfile);

export default router;
