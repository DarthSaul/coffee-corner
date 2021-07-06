import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import Review from '../models/Review.js';

export const auth = (req, res, next) => {
    console.log(req.headers);
    const token = req.header('x-auth-token');
    if (!token) {
        console.log('No token.');
        return res.status(401).json({ msg: 'No token, authorization denied.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};

export const isReviewOwner = async (req, res, next) => {
    try {
        const { id } = req.query;
        const review = await Review.findById(id);
        if (!review.owner.equals(req.user.id)) {
            return res
                .status(401)
                .json({ msg: 'You do not have permission to do that' });
        }
        return next();
    } catch (err) {
        console.log('Whoops, something went wrong...');
        return next();
    }
};
