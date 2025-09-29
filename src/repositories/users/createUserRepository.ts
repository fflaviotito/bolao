import { pool } from '../../db.js';
import type { ResultSetHeader } from 'mysql2';
import type { NewUserData } from '../../types/User.js';

/**
 * Cria um novo registro na tabela 'users'.
 * @param data Os dados do novo usuário.
 * @returns O ID do usuário recém-criado.
 */

const createUserRepository = async (data: NewUserData): Promise<number> => {
    const query = 'INSERT INTO users(name, email, password, role) VALUES (?, ?, ?, ?)';
    const values = [data.name, data.email, data.passwordHash, data.role];

    const [result] = await pool.query<ResultSetHeader>(query, values);

    return result.insertId;
};

export default createUserRepository;
