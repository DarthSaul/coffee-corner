import express from 'express';
import ProfileCtrl from './profile.controller.js';
import { auth } from '../utils/middleware.js';

const router = express.Router();

router.route('/').get(auth, ProfileCtrl.apiGetUserProfile);
router.route('/').put(auth, ProfileCtrl.apiUpdateUser);
router.route('/:profile_id').get(ProfileCtrl.apiGetProfileById);
router.route('/user/:user_id').get(ProfileCtrl.apiGetProfileByUserId);
router.route('/create').post(auth, ProfileCtrl.apiCreateProfile);
router.route('/edit').put(auth, ProfileCtrl.apiUpdateProfile);

export default router;
