/**
 * Converte um objeto Date de JS para string de data do MySQL (YYYY-MM-DD).
 * @param date O objeto Date de JS a ser formatado.
 * @returns A data em string formatada para MySQL.
 */
const toSqlDate = (date: Date): string => {
    return date.toISOString().slice(0, 10);
};

export default toSqlDate;
