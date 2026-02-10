import type z from 'zod';
import { formatarErrosZod } from './formatarErrosZod';
import { AppError } from './AppError';

interface validarFormularioProps<T> {
    dados: unknown;
    schema: z.ZodType<T>;
}

export const validarFormulario = <T>({ dados, schema }: validarFormularioProps<T>): T => {
    const dadosValidos = schema.safeParse(dados);

    if (!dadosValidos.success)
        throw new AppError('Erro de validação', 400, formatarErrosZod(dadosValidos.error));

    return dadosValidos.data;
};
