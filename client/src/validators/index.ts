import { z } from 'zod';

export const nomeUsuarioRegra = z
    .string('Formato esperado para o campo é string')
    .trim()
    .min(3, 'O nome deve conter no mínimo 3 caracteres')
    .regex(/^[A-Za-zÀ-ÿ ]+$/, 'O nome deve conter apenas letras');

export const emailRegra = z.email('Formato de e-mail inválido').trim().toLowerCase();

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
    .min(1, 'Senha é obrigatória');

export const tokenRegra = z
    .string()
    .length(6, 'O código deve ter 6 caracteres')
    .regex(/^[A-Z0-9]+$/, 'O código deve conter apenas letras maiúsculas e números');

export const nomePadraoRegra = z
    .string()
    .trim()
    .min(3, 'O campo deve conter no mínimo 3 caracteres')
    .regex(/^[a-zA-Z0-9\sÀ-ÿ]*$/, 'Apenas letras, números e acentos são permitidos.');

export const divisaoRegra = z
    .string()
    .trim()
    .min(1, 'O campo é obrigatório')
    .regex(/^[a-zA-Z0-9\sÀ-ÿ]*$/, 'Apenas letras, números e acentos são permitidos.');

export const anoRegra = z
    .string()
    .length(4, 'O campo deve conter 4 dígitos')
    .refine((val) => parseInt(val) >= 2020, 'O ano deve ser a partir de 2020')
    .refine(
        (val) => parseInt(val) <= new Date().getFullYear() + 1,
        `O ano deve ser menor que ${new Date().getFullYear() + 2}`
    );

export const dataBrasileiraRegra = z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Formato inválido (use DD/MM/AAAA)')
    .refine((dataString) => {
        const [dia, mes, ano] = dataString.split('/').map(Number);
        const data = new Date(ano, mes - 1, dia);
        return data.getDate() === dia && data.getMonth() === mes - 1 && data.getFullYear() === ano;
    }, 'Data inexistente');
