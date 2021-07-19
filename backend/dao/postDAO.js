import Post from '../models/Post.js';
import Profile from '../models/Profile.js';

export default class PostDAO {
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
}
