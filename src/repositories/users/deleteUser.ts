import type { ResultSetHeader } from 'mysql2';
import { getPool } from '../../db.js';

const pool = getPool();

/**
 * Exclui um registro na tabela 'users'.
 * @param id O id do usuário.
 * @returns True: Usuário excluído com sucesso.
 * @returns False: Falha na exclusão do usuário.
 */
const deleteUser = async (id: number): Promise<boolean> => {
    const query = 'DELETE FROM users WHERE id = ?';

    const [result] = await pool.query<ResultSetHeader>(query, [id]);

    return result.affectedRows === 1;
};

export default deleteUser;
