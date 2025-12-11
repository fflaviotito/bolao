import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
});

api.interceptors.request.use((configuracao) => {
    const token = localStorage.getItem('bolao:token');

    if (token) {
        configuracao.headers.Authorization = `Bearer ${token}`;
    }

    return configuracao;
});

export default api;
