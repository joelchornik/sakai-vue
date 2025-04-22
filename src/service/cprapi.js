import axios from 'axios';

const api = axios.create({ baseURL: 'https://localhost:5001/api' });

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        if (err.response?.status === 401) {
            const refreshToken = localStorage.getItem('refreshToken');
            try {
                const res = await axios.post('/login/refresh', { refreshToken });
                localStorage.setItem('accessToken', res.data.accessToken);
                err.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
                return api(err.config);
            } catch {
                localStorage.clear();
                window.location.href = '/auth/login';
                return Promise.reject(err);
            }
        }
        return Promise.reject(err);
    }
);

export default api;
