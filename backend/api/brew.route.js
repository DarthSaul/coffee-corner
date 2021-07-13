import express from 'express';
import BrewCtrl from './brew.controller.js';
import { auth, isBrewOwner } from '../utils/middleware.js';

const router = express.Router();

router.route('/').get(BrewCtrl.apiGetBrews);
router.route('/:id').get(BrewCtrl.apiGetBrewById);
router.route('/new').post(auth, BrewCtrl.apiCreateBrew);
router.route('/delete/:id').delete(auth, isBrewOwner, BrewCtrl.apiDeleteBrew);

export default router;
