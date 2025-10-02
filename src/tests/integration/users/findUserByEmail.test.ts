import { pool } from '../../../db.js';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import type { UserCreateInput } from '../../../types/User.js';
import createUser from '../../../repositories/users/createUser.js';
import findUserByEmail from '../../../repositories/users/findUserByEmail.js';

const testName = 'Usuário Teste do findUserByEmail';
const testEmail = 'email.a.ser.encontrado@bolao.com';
const testPasswordHash = 'teste_senha_hasheada';

const testUserInput: UserCreateInput = {
    name: testName,
    email: testEmail,
    passwordHash: testPasswordHash,
    role: 'user',
};

let existingUserId: number;

beforeAll(async () => {
    existingUserId = await createUser(testUserInput);
});

afterAll(async () => {
    await pool.query('DELETE FROM users WHERE email = ?', [testEmail]);
    await pool.end();
});

describe('Repositório de Usuário: Busca por email', () => {
    test('Deve encontrar o usuário cadastrado e validar a integridade dos dados', async () => {
        const user = await findUserByEmail(testEmail);
        expect(user).not.toBeNull();
        expect(user?.id).toBe(existingUserId);
        expect(user?.name).toBe(testName);
        expect(user?.email).toBe(testEmail);
    });

    test('Não deve encontrar usuário cadastrado', async () => {
        const emailNotRegistered = 'email.inexistente@bolao.com';

        const user = await findUserByEmail(emailNotRegistered);
        expect(user).toBeNull();
    });
});
