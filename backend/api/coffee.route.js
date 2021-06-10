import express from 'express';
import CoffeeCtrl from './coffee.controller.js';

const router = express.Router();

router.route('/').get(CoffeeCtrl.apiGetCoffees);

export default router;
