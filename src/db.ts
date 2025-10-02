import mysql from 'mysql2/promise';
import type { Pool } from 'mysql2/promise';

interface MySqlError extends Error {
    code?: string;
    sqlMessage?: string;
}

export let pool: Pool | null = null;

/* istanbul ignore next */
export const initializePool = () => {
    if (pool) return;

    const dbConfig = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    };

    pool = mysql.createPool(dbConfig as mysql.PoolOptions);
    console.log(`Pool de conexão criado para o banco: ${process.env.DB_DATABASE}`);
};

/**
 * Retorna a instância do pool de conexões.
 * Garante que o pool foi inicializado ou lança um erro claro.
 */
/* istanbul ignore next */
export const getPool = (): Pool => {
    // 2. Garante a inicialização ou falha
    if (!pool) {
        throw new Error("O Pool de conexões do banco de dados não foi inicializado. Chame initializePool() primeiro.");
    }
    return pool;
};

/* istanbul ignore next */
export const testDbConnection = async () => {
    const currentPool = getPool(); 

    try {
        await currentPool.query('SELECT 1 + 1 AS solution');
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
