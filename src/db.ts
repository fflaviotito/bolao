import mysql from 'mysql2/promise';

interface MySqlError extends Error {
    code?: string;
    sqlMessage?: string;
}

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

export const pool = mysql.createPool(dbConfig as mysql.PoolOptions);

export const testDbConnection = async () => {
    try {
        await pool.query('SELECT 1 + 1 AS solution');
        console.log('----------------------------------------------------');
        console.log('✅ Conexão com o MySQL estabelecida com sucesso.');
    } catch (error) {
        const dbError = error as MySqlError;
        console.error(
            `❌ ERRO CRÍTICO: Falha ao conectar ao MySQL.\n--- Detalhes do erro ---\nCódigo: ${dbError.code}\nMenssagem: ${dbError.sqlMessage}`,
        );
        process.exit(1);
    }
};
