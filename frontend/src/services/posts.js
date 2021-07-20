import http from '../http-common';

class PostDataService {
    getAll() {
        return http.get('/posts');
    }
    getPostById(post_id) {
        return http.get(`/posts/${post_id}`);
    }
    createPost(profile_id, data, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.post(`/posts/new/${profile_id}`, data);
    }
    updatePost(post_id, data, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.put(`/posts/edit/${post_id}`, data);
    }
    deletePost(post_id, profile_id, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.delete(`/posts/delete/${post_id}?profile=${profile_id}`);
    }
    likePost(post_id, profile_id, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.put(`/posts/like/${post_id}?profile=${profile_id}`);
    }
    unlikePost(post_id, profile_id, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.put(`/posts/unlike/${post_id}?profile=${profile_id}`);
    }
}

export default new PostDataService();
