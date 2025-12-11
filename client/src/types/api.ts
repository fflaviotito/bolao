export interface RespostaErro {
    codigo: number;
    mensagem: string;
    erros?: Record<string, string[]>;
    papel: string;
}
