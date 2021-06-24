import express from 'express';
import CoffeeCtrl from './coffee.controller.js';
import ReviewsCtrl from './reviews.controller.js';

import { verifyLogin } from '../utils/middleware.js';

const router = express.Router();

router.route('/').get(CoffeeCtrl.apiGetCoffees);
router.route('/id/:id').get(verifyLogin, CoffeeCtrl.apiGetCoffeeById);
router.route('/distributors').get(CoffeeCtrl.apiGetCoffeeDist);

router
    .route('/review')
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview);

export default router;
