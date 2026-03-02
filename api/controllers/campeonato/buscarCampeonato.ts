import type { Request, Response } from 'express';
import { AppError } from '../../utils/AppError';
import { obterCampeonato } from '../../services/campeonato/obterCampeonato';

export const buscarCampeonato = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw new AppError('O parâmetro id do campeonato é obrigatório', 400);

    const resultado = await obterCampeonato(id);
    return res.json(resultado);
};
