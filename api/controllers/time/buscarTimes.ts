import type { Request, Response } from 'express';
import { PaginacaoQuery } from '../../types/Paginacao';
import { AppError } from '../../utils/AppError';
import { listarTimes } from '../../services/time/listarTimes';

export const buscarTimes = async (
    req: Request<unknown, unknown, unknown, PaginacaoQuery>,
    res: Response
) => {
    const pagina = Number(req.query.pagina);
    const busca = req.query.busca as string;

    if (!pagina) throw new AppError('O parâmetro pagina é obrigatório', 400);

    const resultado = await listarTimes({ busca, pagina });

    return res.json(resultado);
};
