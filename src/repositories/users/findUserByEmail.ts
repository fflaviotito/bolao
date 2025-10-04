import { getPool } from '../../db.js';
import type { RowDataPacket } from 'mysql2';
import type { User } from '../../types/User.js';

const pool = getPool();

/**
 * 🚨 FUNÇÃO DE AJUSTE: Mapeia o objeto do DB (snake_case) para o tipo TS (camelCase).
 * @param row A linha de dados bruta do MySQL.
 */
const mapUserFromDatabase = (row: RowDataPacket): User => {
    return {
        id: row.id,
        name: row.name,
        email: row.email,
        passwordHash: row.password_hash,
        role: row.role,
        active: row.active,
        created_at: row.created_at,
    } as User;
};

/**
 * Busca um registro de usuário na tabela 'users' pelo e-mail.
 * @param email O e-mail a ser pesquisado.
 * @returns O objeto de usuário completo (User) ou null se não for encontrado.
 */
const findUserByEmail = async (email: string): Promise<User | null> => {
    const query = 'SELECT id, name, email, password_hash, role, active, created_at FROM users WHERE email = ?';
    const values = [email];

    const [rows] = await pool.query<User[] & RowDataPacket[]>(query, values);

    if (rows.length === 0) return null;

    return mapUserFromDatabase(rows[0]!);
};

export default findUserByEmail;
