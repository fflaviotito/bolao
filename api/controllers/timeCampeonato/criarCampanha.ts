import type { Request, Response } from 'express';
import { AppError } from '../../utils/AppError';
import { registrarTimeEmCampeonato } from '../../services/timeCampeonato/registrarCampanha';

export const criarCampanha = async (req: Request, res: Response) => {
    const usuarioId = req.usuarioId;
    if (!usuarioId) throw new AppError('Usuário não autenticado.', 401);

    const { campeonatoId } = req.params;
    const { timeId } = req.body;
    if (!timeId || typeof timeId !== 'string') {
        throw new AppError('O ID do time é obrigatório.', 400);
    }

    const novaCampanha = await registrarTimeEmCampeonato({
        campeonatoId,
        timeId,
        criadoPorId: usuarioId
    });

    return res.status(201).json(novaCampanha);
};
