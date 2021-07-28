import PostDAO from '../dao/postDAO.js';

export default class PostController {
    static async apiGetPosts(req, res, next) {
        try {
            const { posts } = await PostDAO.getPosts();
            res.json(posts);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }

    static async apiGetPostById(req, res, next) {
        try {
            const { post_id } = req.params || {};
            const post = await PostDAO.getPostById(post_id);
            if (!post) {
                return res.status(404).json({ error: 'Not found' });
            }
            res.json(post);
        } catch (err) {
            console.error(`api, ${err}`);
            res.status(500).json({ error: err.message });
        }
    }

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

    static async apiUpdatePost(req, res, next) {
        try {
            const response = await PostDAO.updatePost(
                req.params.post_id,
                req.body
            );
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

    static async apiDeletePost(req, res, next) {
        try {
            const response = await PostDAO.deletePost(
                req.params.post_id,
                req.query.profile
            );
            const { deletedPost } = response;
            if (!deletedPost) {
                throw new Error('Server error');
            }
            res.json({ status: 'success', deletedPost });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }

    static async apiLikePost(req, res, next) {
        try {
            const response = await PostDAO.likePost(
                req.params.post_id,
                req.query.profile
            );
            const { post, error } = response;
            if (error) {
                throw new Error(error);
            }
            res.json({ status: 'success', post });
        } catch (err) {
            console.error(err);
            if (err.kind == 'ObjectId') {
                return res.status(400).json({ msg: 'Post not found' });
            }
            res.status(500).json({ msg: err.message });
        }
    }

    static async apiUnlikePost(req, res, next) {
        try {
            const response = await PostDAO.unlikePost(
                req.params.post_id,
                req.query.profile
            );
            const { updatedPost, error } = response;
            if (error) {
                throw new Error(error);
            }
            res.json({ status: 'success', updatedPost });
        } catch (err) {
            console.error(err);
            if (err.kind == 'ObjectId') {
                return res.status(400).json({ msg: 'Post not found' });
            }
            res.status(500).json({ msg: err.message });
        }
    }

    static async apiPostComment(req, res, next) {
        try {
            const response = await PostDAO.postComment(
                req.body,
                req.params.post_id,
                req.query.profile
            );
            const { post } = response;
            if (!post) {
                throw new Error('Server error');
            }
            res.json({ status: 'success', post });
        } catch (err) {
            console.error(err);
            if (err.kind == 'ObjectId') {
                return res.status(400).json({ msg: 'Post not found' });
            }
            res.status(500).json({ msg: err.message });
        }
    }

    static async apiDeleteComment(req, res, next) {
        try {
            const response = await PostDAO.deleteComment(
                req.params.post_id,
                req.query.comment
            );
            const { post } = response;
            if (!post) {
                throw new Error('Server error');
            }
            res.json({ status: 'success', post });
        } catch (error) {
            console.error(err);
            if (err.kind == 'ObjectId') {
                return res.status(400).json({ msg: 'Post not found' });
            }
            res.status(500).json({ msg: err.message });
        }
    }
}
