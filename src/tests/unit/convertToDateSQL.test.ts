import { describe, expect, test } from '@jest/globals';
import toSqlDate from '../../utils/toSqlDate.js';

describe('Utilitário: Testes de Formatação de Data', () => {
    test('Deve converter um objeto Date JS para o formato Date SQL YYYY-MM-DD (apenas data)', () => {
        const date = new Date('2025-02-11T00:00:00Z');

        const dateFormatted = toSqlDate(date);
        expect(dateFormatted).toBe('2025-02-11');
    });
});
