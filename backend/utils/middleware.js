import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import Review from '../models/Review.js';
import BrewMethod from '../models/BrewMethod.js';
import Post from '../models/Post.js';

export const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
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
        const { id } = req.query;
        const review = await Review.findById(review_id || id);
        if (!review.user.equals(req.user.id)) {
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

export const isBrewOwner = async (req, res, next) => {
    try {
        const { brew_id } = req.params;
        const brewMethod = await BrewMethod.findById(brew_id);
        if (!brewMethod.user.equals(req.user.id)) {
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

export const isPostOwner = async (req, res, next) => {
    try {
        const { post_id } = req.params;
        const post = await Post.findById(post_id).populate({
            path: 'profile',
            populate: { path: 'user' }
        });
        if (!post.profile.user._id.equals(req.user.id)) {
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
