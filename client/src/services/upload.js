import http from '../http-common';

class UploadDataService {
    uploadFile(data, token) {
        http.defaults.headers.common['x-auth-token'] = token;
        return http.post('/upload', data);
    }
}

export default new UploadDataService();
