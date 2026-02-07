import type z from 'zod';
import { formatarErrosZod } from './formatarErrosZod';
import { toast } from 'react-toastify';

interface validarFormularioProps {
    dados: unknown;
    schema: z.ZodType;
    setErros: (erros: Record<string, string[]>) => void;
}

export const validarFormulario = ({ dados, schema, setErros }: validarFormularioProps) => {
    const dadosValidos = schema.safeParse(dados);

    if (!dadosValidos.success) {
        const errosFormatados = formatarErrosZod(dadosValidos.error);
        setErros(errosFormatados);
        toast.warning('Verifique os campos destacados!');
        return false;
    }

    setErros({});
    return dadosValidos;
};
