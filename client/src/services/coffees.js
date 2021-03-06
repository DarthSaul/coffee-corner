import http from '../http-common';

class CoffeeDataService {
    getAll(page, perPage = 100) {
        return http.get(`/coffee?pageCount=${page}&coffeesPerPage=${perPage}`);
    }

    get(id) {
        return http.get(`/coffee/id/${id}`);
    }

    find(query, by = 'name', perPage = 10, page = 0) {
        return http.get(
            `/coffee?${by}=${query}&coffeesPerPage=${perPage}&page=${page}`
        );
    }

    createCoffee(profile_id, data, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.post(`/coffee/new/${profile_id}`, data);
    }

    updateCoffee(coffee_id, data, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.put(`/coffee/edit/${coffee_id}`, data);
    }

    deleteCoffee(coffee_id, profile_id, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.delete(`/coffee/delete/${coffee_id}?profile=${profile_id}`);
    }

    createReview(data, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.post('/coffee/review', data);
    }

    updateReview(id, data, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.put(`/coffee/review?id=${id}`, data);
    }

    deleteReview(id, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.delete(`/coffee/review?id=${id}`);
    }

    getDist() {
        return http.get(`/coffee/distributors`);
    }
}

export default new CoffeeDataService();
