import express from 'express';
import BrewCtrl from './brew.controller.js';
import { auth } from '../utils/middleware.js';

const router = express.Router();

router.route('/').get(BrewCtrl.apiGetBrews);
router
    .route('/:id')
    .get(BrewCtrl.apiGetBrewById)
    .delete(auth, BrewCtrl.apiDeleteBrew);
router.route('/new').post(auth, BrewCtrl.apiCreateBrew);

export default router;
