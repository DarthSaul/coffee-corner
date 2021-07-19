import http from '../http-common';

class PostDataService {
    getAll() {
        return http.get('/posts');
    }
    createPost(profile_id, data, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.post(`posts/new/${profile_id}`, data);
    }
}

export default new PostDataService();
