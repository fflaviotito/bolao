import type { UserCreateInput } from '../../../types/User.js';
import { afterAll, afterEach, describe, expect, test } from '@jest/globals';
import { getPool } from '../../../db.js';
import createUser from '../../../repositories/users/createUser.js';
import findUserByEmail from '../../../repositories/users/findUserByEmail.js';

const pool = getPool();

const testName = 'Usuário Temporário de Teste';
const testEmail = `temp.test.${Date.now()}@bolao.com`;
const testPasswordHash = 'teste_senha_hasheada';

const testUserInput: UserCreateInput = {
    name: testName,
    email: testEmail,
    passwordHash: testPasswordHash,
    role: 'user',
};

afterAll(async () => {
    await pool.end();
});

afterEach(async () => {
    await pool.query('DELETE FROM users WHERE email = ?', [testEmail]);
});

describe('Repositório de Usuário: Criação', () => {
    test('Deve criar um novo usuário e confirmar sua existência no banco', async () => {
        const newId = await createUser(testUserInput);
        expect(newId).toBeGreaterThan(0);

        const user = await findUserByEmail(testEmail);
        expect(user).toBeDefined();
    });
});
