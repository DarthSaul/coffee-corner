import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import Review from '../models/Review.js';

export const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        console.error('No token.');
        return res.status(401).json({ msg: 'No token, authorization denied.' });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: 'Token is not valid' });
            } else {
                req.user = decoded.user;
                return next();
            }
        });
    } catch (err) {
        console.error('something wrong with auth middleware');
        res.status(500).json({ msg: 'Server Error' });
    }
};

export const isReviewOwner = async (req, res, next) => {
    try {
        const { review_id } = req.body;
        const review = await Review.findById(review_id);
        if (!review.owner.equals(req.user.id)) {
            return res
                .status(401)
                .json({ msg: 'You do not have permission to do that' });
        }
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};
