import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import type { UserCreateInput } from '../../../types/User.js';
import createUser from '../../../repositories/users/createUser.js';
import { getPool } from '../../../db.js';
import findAllUsers from '../../../repositories/users/findAllUsers.js';

const pool = getPool();

const testUserInput1: UserCreateInput = {
    name: 'Usuário1 Teste do findAllUsers',
    email: `email.test1.${Date.now()}@bolao.com`,
    passwordHash: 'teste_senha_hasheada1',
    role: 'user',
};

const testUserInput2: UserCreateInput = {
    name: 'Usuário2 Teste do findAllUsers',
    email: `email.test2.${Date.now()}@bolao.com`,
    passwordHash: 'teste_senha_hasheada2',
    role: 'user',
};

let userId1: number;
let userId2: number;

beforeAll(async () => {
    userId1 = await createUser(testUserInput1);
    userId2 = await createUser(testUserInput2);
});

afterAll(async () => {
    const query = 'DELETE FROM users WHERE id IN (?, ?)';
    const values = [userId1, userId2];

    await pool.query(query, values);
    await pool.end();
});

describe('Repositório de Usuário: Busca todos os dados', () => {
    test('Deve retornar todos os usuários cadastrados e validar sua integridade', async () => {
        const users = await findAllUsers();
        expect(users.length).toBe(2);

        const user1 = users.find((user) => user.email === testUserInput1.email);
        const user2 = users.find((user) => user.email === testUserInput2.email);

        expect(user1).toBeDefined();
        expect(user2).toBeDefined();
        expect(user1?.name).toBe('Usuário1 Teste do findAllUsers');
        expect(user2?.name).toBe('Usuário2 Teste do findAllUsers');
    });
});
