import { pool } from '../../db.js';
import type { RowDataPacket } from 'mysql2';
import type { User } from '../../types/User.js';

/**
 * Busca um registro de usuário na tabela 'users' pelo e-mail.
 * @param email O e-mail a ser pesquisado.
 * @returns O objeto de usuário completo (User) ou null se não for encontrado.
 */

const findUserByEmail = async (email: string): Promise<User | null> => {
    const query = 'SELECT id, name, email, password_hash, role, active, created_at FROM users WHERE email = ?';
    const values = [email];

    const [rows] = await pool.query<User[] & RowDataPacket[]>(query, values);

    return (rows.length > 0 ? rows[0] : null) as User | null;
};

export default findUserByEmail;
