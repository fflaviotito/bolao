import { randomInt } from 'crypto';

export const gerarCodigoVerificacao = (tamanho = 6) => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';

    for (let i = 0; i < tamanho; i++) {
        const indice = randomInt(0, caracteres.length);
        codigo += caracteres[indice];
    }

    return codigo;
};
