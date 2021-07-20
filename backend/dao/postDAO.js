import Post from '../models/Post.js';
import Profile from '../models/Profile.js';

export default class PostDAO {
    static async getPosts() {
        try {
            const posts = await Post.find().populate({ path: 'profile' });
            return { posts };
        } catch (err) {
            console.error(`Unable to locate posts, ${err}`);
            return { posts: [] };
        }
    }

    static async getPostById(id) {
        try {
            const post = await Post.findById(id).populate({ path: 'profile' });
            return post;
        } catch (err) {
            console.error(`Unable to find post, ${err}`);
            return { error: err };
        }
    }

    static async addPost(data, profile_id) {
        try {
            const { title, text } = data;
            const profile = await Profile.findById(profile_id);
            const post = new Post({ title, text });
            post.profile = profile_id;
            profile.posts.push(post);
            await post.save();
            await profile.save();
            return { post };
        } catch (err) {
            console.error(`Unable to create post, ${err}`);
            return { error: err };
        }
    }

    static async updatePost(post_id, data) {
        try {
            const post = await Post.findByIdAndUpdate(post_id, data, {
                new: true
            });
            if (!post) {
                throw new Error('Unable to retrive post for update.');
            }
            return { post };
        } catch (err) {
            console.error(`Unable to update post, ${err}`);
            return { error: err };
        }
    }

    static async deletePost(post_id, profile_id) {
        try {
            const deletedPost = await Post.findByIdAndDelete(post_id);
            if (!deletedPost) {
                throw new Error('Unable to find post to delete.');
            }
            await Profile.findByIdAndUpdate(profile_id, {
                $pull: { posts: post_id }
            });
            return { deletedPost };
        } catch (err) {
            console.error(`Unable to delete post, ${err}`);
            return { error: err };
        }
    }

    static async likePost(post_id, profile_id) {
        try {
            const post = await Post.findById(post_id);
            if (post.likes.some(el => `${el._id}` === profile_id)) {
                return { error: 'User profile already liked post.' };
            }
            post.likes.push(profile_id);
            await post.save();
            return { post };
        } catch (err) {
            console.error(`Unable to like post, ${err}`);
            return { error: err };
        }
    }

    static async unlikePost(post_id, profile_id) {
        try {
            const post = await Post.findById(post_id);
            const notLiked =
                post.likes.filter(el => `${el._id}` === profile_id).length ===
                0;
            if (notLiked) {
                return { error: 'User profile has not liked this post.' };
            }
            const updatedPost = await Post.findByIdAndUpdate(
                post_id,
                { $pull: { likes: { _id: profile_id } } },
                { new: true }
            );
            return { updatedPost };
        } catch (err) {
            console.error(`Unable to unlike post, ${err}`);
            return { error: err };
        }
    }
}
