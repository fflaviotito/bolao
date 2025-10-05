import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { getPool } from '../../../db.js';
import type { UserCreateInput } from '../../../types/User.js';
import createUser from '../../../repositories/users/createUser.js';
import deleteUser from '../../../repositories/users/deleteUser.js';
import findUserByEmail from '../../../repositories/users/findUserByEmail.js';

const pool = getPool();

const testUserInput: UserCreateInput = {
    name: 'Usuário Teste do deleteUser',
    email: 'email.teste.deleteUser@bolao.com',
    passwordHash: 'Senha_deleteUser',
    role: 'user',
};

let existingUserId: number;

beforeAll(async () => {
    existingUserId = await createUser(testUserInput);
});

afterAll(async () => {
    await pool.query('DELETE FROM users WHERE id = ?', [existingUserId]);
    await pool.end();
});

describe('Repositório de Usuário: Deletar', () => {
    test('Deve realizar a exclusão de um usuário e validar a integridade', async () => {
        const deleteSuccessful = await deleteUser(existingUserId);
        expect(deleteSuccessful).toBe(true);

        const user = await findUserByEmail(testUserInput.email);
        expect(user).toBeNull();
    });

    test('Deve retornar false caso o ID seja inexistente', async () => {
        const nonExistentId = 999999;

        const deleteSuccessful = await deleteUser(nonExistentId);
        expect(deleteSuccessful).toBe(false);
    });
});
