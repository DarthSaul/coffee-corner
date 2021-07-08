import http from '../http-common';

class CoffeeDataService {
    getAll(page, perPage = 100) {
        return http.get(`?pageCount=${page}&coffeesPerPage=${perPage}`);
    }

    get(id) {
        return http.get(`/id/${id}`);
    }

    find(query, by = 'name', perPage = 10, page = 0) {
        return http.get(
            `?${by}=${query}&coffeesPerPage=${perPage}&page=${page}`
        );
    }

    createReview(data, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.post('/review', data);
    }

    updateReview(data, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.put('/review', data);
    }

    deleteReview(id, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.delete(`/review?id=${id}`);
    }

    getDist() {
        return http.get(`/distributors`);
    }
}

export default new CoffeeDataService();
