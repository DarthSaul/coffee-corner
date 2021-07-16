import http from '../http-common';

class BrewDataService {
    getAll() {
        return http.get('/brew');
    }
    getBrewById(id) {
        return http.get(`/brew/${id}`);
    }
    newBrew(data, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.post('/brew/new', data);
    }
    updateBrew(brew_id, data, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.put(`/brew/edit/${brew_id}`, data);
    }
    deleteBrew(brew_id, profile_id, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.delete(`/brew/delete/${brew_id}?profile=${profile_id}`);
    }
}

export default new BrewDataService();
