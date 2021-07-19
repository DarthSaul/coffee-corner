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
}

export default new PostDataService();
