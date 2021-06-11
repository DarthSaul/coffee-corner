import Review from '../models/Review.js';
import Coffee from '../models/Coffee.js';

export default class ReviewDAO {
    static async addReview(coffee_id, text, name) {
        try {
            const coffee = await Coffee.findById(coffee_id);
            const review = new Review({
                name,
                text
            });
            coffee.reviews.push(review);
            await coffee.save();
            await review.save();
            return { review };
        } catch (err) {
            console.error(`Unable to post review, ${err}`);
            return { error: err };
        }
    }
    static async updateReview(review_id, text, date) {
        try {
            const review = await Review.findByIdAndUpdate(
                review_id,
                { text, date },
                { new: true }
            );
            if (review) {
                return { review };
            } else {
                throw new Error('Unable to find review to update.');
            }
        } catch (err) {
            console.error(`Unable to update review, ${err}`);
            return { error: err };
        }
    }
    static async deleteReview(review_id) {
        try {
            const deletedReview = await Review.findByIdAndDelete(review_id);
            if (deletedReview) {
                return { deletedReview };
            } else {
                throw new Error('Unable to find review to delete.');
            }
        } catch (err) {
            console.error(`Unable to delete review, ${err}`);
            return { error: err };
        }
    }
}
