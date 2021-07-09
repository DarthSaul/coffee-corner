import express from 'express';
import ProfileCtrl from './profile.controller.js';
import { auth } from '../utils/middleware.js';

const router = express.Router();

router.route('/').get(auth, ProfileCtrl.apiGetUserProfile);
router.route('/id/:id').get(ProfileCtrl.apiGetProfileById);
router.route('/create').post(auth, ProfileCtrl.apiCreateProfile);

export default router;
