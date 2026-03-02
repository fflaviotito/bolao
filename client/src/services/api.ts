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

api.interceptors.response.use(
    (resposta) => {
        return resposta;
    },
    (erro) => {
        if (erro.response && erro.response.status === 401) {
            if (window.location.pathname !== '/entrar') {
                localStorage.removeItem('bolao:token');
                localStorage.removeItem('bolao:usuario');
                window.location.href = '/entrar';
            }
        }
        return Promise.reject(erro);
    }
);

export default api;
