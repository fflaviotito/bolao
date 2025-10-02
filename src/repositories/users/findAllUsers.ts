import type { RowDataPacket } from 'mysql2';
import { getPool } from '../../db.js';
import type { User } from '../../types/User.js';

const pool = getPool();

/**
 * Busca todos os registros na tabela 'users'.
 * @returns Um array de objetos de usuários completo (User).
 */

const findAllUsers = async () => {
    const query = 'SELECT * FROM users';

    const [rows] = await pool.query<User[] & RowDataPacket[]>(query);

    return rows;
};

export default findAllUsers;
