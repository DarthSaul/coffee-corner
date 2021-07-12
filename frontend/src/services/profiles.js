import http from '../http-common';

class ProfileDataService {
    getUserProfile(token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.get('/profile');
    }
    updateUser(data, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.put('/profile', data);
    }
    getProfileById(id) {
        return http.get(`/profile/id/${id}`);
    }
    createProfile(data, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.post('/profile/create', data);
    }
    updateProfile(data, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        console.log(data);
        return http.put('/profile/edit', data);
    }
}

export default new ProfileDataService();
