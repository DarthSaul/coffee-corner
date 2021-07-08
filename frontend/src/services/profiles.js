import http from '../http-common';

class ProfileDataService {
    getUserProfile(token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.get('/profile');
    }
    getProfileById(id) {
        return http.get(`/profile/id/${id}`);
    }
    createProfile(data, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.post('/profile/create', data);
    }
}

export default new ProfileDataService();
