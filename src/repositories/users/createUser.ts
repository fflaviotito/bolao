import { getPool } from '../../db.js';
import type { ResultSetHeader } from 'mysql2';
import type { UserCreateInput } from '../../types/User.js';

const pool = getPool();

/**
 * Cria um novo registro na tabela 'users'.
 * @param data Os dados do novo usuário.
 * @returns O ID do usuário recém-criado.
 */

const createUser = async (data: UserCreateInput): Promise<number> => {
    const query = 'INSERT INTO users(name, email, password_hash, role) VALUES (?, ?, ?, ?)';
    const values = [data.name, data.email, data.passwordHash, data.role];

    const [result] = await pool.query<ResultSetHeader>(query, values);

    return result.insertId;
};

export default createUser;
