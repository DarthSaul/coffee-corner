import Review from '../models/Review.js';
import Coffee from '../models/Coffee.js';

export default class ReviewDAO {
    static async addReview(coffee_id, text, user_id) {
        try {
            const coffee = await Coffee.findById(coffee_id);
            const review = new Review({ text });
            review.user = user_id;
            coffee.reviews.push(review);
            await coffee.save();
            await review.save();
            return { review };
        } catch (err) {
            console.error(`Unable to post review, ${err}`);
            return { error: err };
        }
    }
    static async updateReview(review_id, data) {
        try {
            const review = await Review.findByIdAndUpdate(review_id, data, {
                new: true
            });
            if (!review) {
                throw new Error('Unable to find review to update.');
            }
            return { review };
        } catch (err) {
            console.error(`Unable to update review, ${err}`);
            return { error: err };
        }
    }
    static async deleteReview(review_id) {
        try {
            const deletedReview = await Review.findByIdAndDelete(review_id);
            if (!deletedReview) {
                throw new Error('Unable to find review to delete.');
            }
            return { deletedReview };
        } catch (err) {
            console.error(`Unable to delete review, ${err}`);
            return { error: err };
        }
    }
}
