import ReviewsDAO from '../dao/reviewsDAO.js';

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const { coffee_id, text, user_id } = req.body;
            const reviewResponse = await ReviewsDAO.addReview(
                coffee_id,
                text,
                user_id
            );
            const { review } = reviewResponse;
            res.json({ status: 'success', review });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const { review_id, text } = req.body;
            const reviewResponse = await ReviewsDAO.updateReview(
                review_id,
                text,
                Date.now()
            );
            const { error, review } = reviewResponse;
            if (error) {
                return res.status(400).json({ error });
            }
            res.json({ status: 'success', review });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const { id } = req.query;
            const reviewResponse = await ReviewsDAO.deleteReview(id);
            const { deletedReview } = reviewResponse;
            res.json({ status: 'success', deletedReview });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
