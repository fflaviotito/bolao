import { z } from 'zod';

export const nomeRegra = z
    .string('Formato esperado para o campo é string')
    .trim()
    .min(3, 'O nome deve conter no mínimo 3 caracteres')
    .regex(/^[A-Za-zÀ-ÿ ]+$/, 'O nome deve conter apenas letras');

export const emailRegra = z
    .email('Formato de e-mail inválido')
    .trim()
    .toLowerCase();

export const senhaForteRegra = z
    .string('Formato esperado para o campo é string')
    .min(8, 'A senha deve conter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
    .regex(/[@$!%*?&]/, 'A senha deve conter pelo menos um caractere especial (@$!%*?&)');

export const senhaPuraLogin = z
    .string('Formato esperado para o campo é string')
    .trim()
    .min(1, 'Senha é obrigatória')

export const tokenRegra = z
    .string()
    .length(6, 'O código deve ter 6 caracteres.')
    .regex(/^[A-Z0-9]+$/, 'O código deve conter apenas letras maiúsculas e números.');
    