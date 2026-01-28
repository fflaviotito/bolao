import z from 'zod';
import { anoRegra, dataRegra, nomePadraoRegra } from '../../validators/regras';
import type { Request, Response } from 'express';
import { AppError } from '../../utils/AppError';
import { formatarErrosZod } from '../../utils/formatarErrosZod';
import { registrarCampeonato } from '../../services/campeonato/registrarCampeonato';

const schema = z.object({
    nome: nomePadraoRegra,
    divisao: nomePadraoRegra,
    ano: anoRegra,
    dataInicio: dataRegra,
    dataFim: dataRegra
});

export const criarCampeonato = async (req: Request, res: Response) => {
    const dadosValidos = schema.safeParse(req.body);
    if (!dadosValidos.success)
        throw new AppError('Erro de validação', 400, formatarErrosZod(dadosValidos.error));

    const usuarioId = req.usuarioId;
    if (!usuarioId) throw new AppError('Usuário não autenticado.', 401);

    const novoCampeonato = await registrarCampeonato({
        ...dadosValidos.data,
        criadoPorId: usuarioId
    });

    return res.status(201).json(novoCampeonato);
};
