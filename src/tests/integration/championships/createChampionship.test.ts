import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { getPool } from '../../../db.js';
import type { ChampionshipCreateInput } from '../../../types/Championship.js';
import type { UserCreateInput } from '../../../types/User.js';
import createUser from '../../../repositories/users/createUser.js';
import createChampionship from '../../../repositories/championships/createChampionship.js';

const pool = getPool();

let existingUserId: number;
const testUserInput: UserCreateInput = {
    name: 'Usuário Teste createChampionship',
    email: 'teste.createChampionship@bolao.com',
    passwordHash: 'teste_senha_hasheada',
    role: 'user',
};

let newIdChampionship: number;
let testChampionshipInput: ChampionshipCreateInput;

beforeAll(async () => {
    existingUserId = await createUser(testUserInput);

    testChampionshipInput = {
        name: 'Campeonato de Teste do createChampionship',
        division: 'Serie A',
        year: '2025',
        startDate: new Date('2025-02-11T00:00:00Z'),
        endDate: new Date('2025-11-02T00:00:00Z'),
        createdBy: existingUserId,
    };
});

afterAll(async () => {
    await pool.query('DELETE FROM championships WHERE id = ?', [newIdChampionship]);
    await pool.query('DELETE FROM users WHERE id = ?', [existingUserId]);
    await pool.end();
});

describe('Repositório de Campeonato: Criação', () => {
    test('Deve criar um novo campeonato e confirmar sua existência no banco', async () => {
        newIdChampionship = await createChampionship(testChampionshipInput);
        expect(newIdChampionship).toBeGreaterThan(0);
    });
});
