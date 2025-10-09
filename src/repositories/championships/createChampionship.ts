import type { ResultSetHeader } from 'mysql2';
import { getPool } from '../../db.js';
import type { ChampionshipCreateInput } from '../../types/Championship.js';
import toSqlDate from '../../utils/toSqlDate.js';

const pool = getPool();

/**
 * Cria um novo campeonato.
 * @param data Os dados do novo campeonato.
 * @returns O ID do campeonato recém-criado.
 */
const createChampionship = async (data: ChampionshipCreateInput): Promise<number> => {
    const startDateFormatted = toSqlDate (data.startDate);
    const endDateFormatted = toSqlDate (data.endDate);

    const query = `INSERT INTO championships (
        name,
        division,
        year,
        start_date,
        end_date,
        created_by
    ) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
        data.name,
        data.division,
        data.year,
        startDateFormatted,
        endDateFormatted,
        data.createdBy,
    ];

    const [result] = await pool.query<ResultSetHeader>(query, values);

    return result.insertId;
};

export default createChampionship;
