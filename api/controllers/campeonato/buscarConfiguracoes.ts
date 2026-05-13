import type { Request, Response } from 'express';
import { AppError } from '../../utils/AppError';
import { obterConfiguracoes } from '../../services/campeonato/obterConfiguracoes';

export const buscarConfiguracoes = async (req: Request, res: Response) => {
    const { campeonatoId } = req.params;
    if (!campeonatoId) throw new AppError('ID do campeonato não informado na rota.', 400);

    const resultado = await obterConfiguracoes(campeonatoId);

    return res.json(resultado);
};
