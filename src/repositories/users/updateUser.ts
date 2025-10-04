import type { ResultSetHeader } from 'mysql2';
import { getPool } from '../../db.js';
import type { UserUpdateData } from '../../types/User.js';

const pool = getPool();

/**
 * Atualiza os dados de um usuário, aplicando apenas os campos fornecidos.
 * @param data Os dados a serem atualizados (deve incluir o id do usuário).
 * @returns True: Atualização bem-sucedida.
 * @returns False: Não recebeu nenhuma informação a ser atualizada.
 */
const updateUser = async (data: UserUpdateData): Promise<boolean> => {
    const { id, ...updateFields } = data;
    const setFromQuery: string[] = [];
    const values: (string | number)[] = [];

    for (const [key, value] of Object.entries(updateFields)) {
        const dbColumn = key === 'passwordHash' ? 'password_hash' : key;
        setFromQuery.push(`${dbColumn} = ?`);
        values.push(value);
    }

    if (setFromQuery.length === 0) {
        return false;
    }

    const setFromQueryString = setFromQuery.join(', ');
    const query = `
        UPDATE users
        SET ${setFromQueryString}
        WHERE id = ?
    `;

    values.push(id);

    const [result] = await pool.query<ResultSetHeader>(query, values);

    return result.affectedRows > 0;
};

export default updateUser;
