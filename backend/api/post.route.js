import express from 'express';
import PostCtrl from './post.controller.js';
import { auth } from '../utils/middleware.js';

const router = express.Router();

router.route('/new/:profile_id').post(auth, PostCtrl.apiCreatePost);

export default router;
