export interface LoginResponse {
    token: string;
    usuario: {
        id: string;
        nome: string;
        email: string;
    };
}
