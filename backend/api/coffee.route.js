import express from 'express';
import CoffeeCtrl from './coffee.controller.js';
import ReviewsCtrl from './reviews.controller.js';
import { auth, isReviewOwner } from '../utils/middleware.js';

const router = express.Router();

router.route('/').get(CoffeeCtrl.apiGetCoffees);
router.route('/new').post(auth, CoffeeCtrl.apiCreateCoffee);
router.route('/id/:id').get(CoffeeCtrl.apiGetCoffeeById);
router.route('/distributors').get(CoffeeCtrl.apiGetCoffeeDist);

router
    .route('/review')
    .post(auth, ReviewsCtrl.apiPostReview)
    .put(auth, isReviewOwner, ReviewsCtrl.apiUpdateReview)
    .delete(auth, isReviewOwner, ReviewsCtrl.apiDeleteReview);

export default router;
