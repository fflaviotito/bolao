export interface RegistrarUsuarioEntrada {
    nome: string;
    email: string;
    senhaPura: string;
    senhaConfirmacao: string;
}

export interface UsuarioSaida {
    id: number;
    nome: string;
    email: string;
    ativo: boolean;
    papel: 'user' | 'admin';
    criadoEm: Date;
    atualizadoEm: Date;
}
