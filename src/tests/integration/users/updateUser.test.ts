import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import type { UserCreateInput, UserUpdateData } from '../../../types/User.js';
import createUser from '../../../repositories/users/createUser.js';
import { getPool } from '../../../db.js';
import updateUser from '../../../repositories/users/updateUser.js';
import findUserByEmail from '../../../repositories/users/findUserByEmail.js';

const pool = getPool();

const testEmail = `teste.update.user@bolao.com`;
const testUserInput: UserCreateInput = {
    name: 'Antigo Usuário Teste do updateUser',
    email: testEmail,
    passwordHash: 'Senha_antiga_updateUser',
    role: 'user',
};

let existingUserId: number;

beforeAll(async () => {
    existingUserId = await createUser(testUserInput);
});

afterAll(async () => {
    await pool.query('DELETE FROM users WHERE id = ?', [existingUserId]);
    pool.end();
});

describe('Repositório de Usuário: Atualização', () => {
    test('Deve realizar uma atualização parcial e validar a integridade dos dados', async () => {
        const testUserUpdate: UserUpdateData = {
            id: existingUserId,
            name: 'Atualizado Usuário Teste do updateUser',
            passwordHash: 'Senha_atualizada_updateUser',
        };

        const updateSuccessful = await updateUser(testUserUpdate);
        expect(updateSuccessful).toBe(true);

        const user = await findUserByEmail(testEmail);
        expect(user).toBeDefined();
        expect(user?.id).toBe(existingUserId);
        expect(user?.name).toBe(testUserUpdate.name);
        expect(user?.passwordHash).toBe(testUserUpdate.passwordHash);
        expect(user?.role).toBe(testUserInput.role);
    });

    test('Deve retornar false caso o ID seja inexistente', async () => {
        const testUserUpdate: UserUpdateData = {
            id: 999999,
            name: 'Segunda Atualização Usuário Teste do updateUser',
        };

        const updateSuccessful = await updateUser(testUserUpdate);
        expect(updateSuccessful).toBe(false);
    });

    test('Deve retornar false caso nenhum dado seja fornecido para atualização', async () => {
        const testUserUpdate: UserUpdateData = {
            id: existingUserId,
        };

        const updateSuccessful = await updateUser(testUserUpdate);
        expect(updateSuccessful).toBe(false);
    });
});
