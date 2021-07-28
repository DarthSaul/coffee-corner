import express from 'express';
import PostCtrl from './post.controller.js';
import { auth, isPostOwner, isCommentOwner } from '../utils/middleware.js';

const router = express.Router();

router.route('/').get(PostCtrl.apiGetPosts);
router.route('/:post_id').get(PostCtrl.apiGetPostById);
router.route('/new/:profile_id').post(auth, PostCtrl.apiCreatePost);
router.route('/edit/:post_id').put(auth, isPostOwner, PostCtrl.apiUpdatePost);
router
    .route('/delete/:post_id')
    .delete(auth, isPostOwner, PostCtrl.apiDeletePost);

router.route('/like/:post_id').put(auth, PostCtrl.apiLikePost);
router.route('/unlike/:post_id').put(auth, PostCtrl.apiUnlikePost);

router.route('/comment/:post_id').put(auth, PostCtrl.apiPostComment);
router
    .route('/comment/:post_id')
    .delete(auth, isCommentOwner, PostCtrl.apiDeleteComment);

export default router;
