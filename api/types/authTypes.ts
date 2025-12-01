import { Usuario } from '@prisma/client';

export interface LoginEntrada {
    email: string;
    senhaPura: string;
}

export interface LoginSaida {
    usuario: {
        id: number;
        nome: string;
        email: string;
        papel: string;
    };
    token: string;
}
