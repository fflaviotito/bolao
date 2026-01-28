export interface RespostaErro {
    codigo: number;
    message: string;
    errors?: Record<string, string[]>;
    papel: string;
}
