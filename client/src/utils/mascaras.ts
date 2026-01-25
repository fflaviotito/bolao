export const mascaraData = (valor: string) => {
    return valor
        .replace(/\D/g, '') // Remove tudo que não é número
        .replace(/(\d{2})(\d)/, '$1/$2') // Coloca a 1ª barra
        .replace(/(\d{2})(\d)/, '$1/$2') // Coloca a 2ª barra
        .slice(0, 10); // Limita tamanho
};

export const mascaraAno = (valor: string) => {
    return valor
        .replace(/\D/g, '') // Apenas números
        .slice(0, 4); // Máximo 4 dígitos
};

export const mascaraTextoPadrao = (valor: string) => {
    // Remove caracteres especiais, mantém letras, números, espaços e acentos
    return valor.replace(/[^a-zA-Z0-9\sÀ-ÿ]/g, '');
};
