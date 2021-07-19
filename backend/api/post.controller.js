import PostDAO from '../dao/postDAO.js';

export default class PostController {
    static async apiCreatePost(req, res, next) {
        try {
            const { profile_id } = req.params;
            const response = await PostDAO.addPost(req.body, profile_id);
            const { post, error } = response;
            if (error) {
                throw new Error(error);
            }
            res.json({ status: 'success', post });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
}
