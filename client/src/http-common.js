import axios from 'axios';

export default axios.create({
    baseURL: process.env.baseURL || 'http://localhost:5000/api/v1',
    header: {
        'Content-type': 'application/json'
    }
});
