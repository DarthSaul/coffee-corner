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
}

export default new BrewDataService();
