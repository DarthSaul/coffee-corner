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
    deleteBrew(id, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.delete(`/brew/${id}`);
    }
}

export default new BrewDataService();
