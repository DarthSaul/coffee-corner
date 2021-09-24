import http from '../http-common';

class UploadDataService {
    uploadFile(data, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.post('/upload', data);
    }
    uploadCoffeeImg(coffee_id, data, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.post(`/upload/coffee_image/${coffee_id}`, data);
    }
}

export default new UploadDataService();
