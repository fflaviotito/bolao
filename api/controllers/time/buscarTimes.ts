import type { Request, Response } from 'express';
import { PaginacaoQuery } from '../../types/Paginacao';
import { AppError } from '../../utils/AppError';
import { listarTimesPaginado } from '../../services/time/listarTimesPaginado';
import { listarTimes } from '../../services/time/listarTimes';

export const buscarTimes = async (
    req: Request<unknown, unknown, unknown, PaginacaoQuery>,
    res: Response
) => {
    const paginar = req.query.paginar;
    if (!paginar) throw new AppError('O parâmetro paginar é obrigatório', 400);

    const busca = req.query.busca as string;

    if (paginar === 'false') {
        const resultado = await listarTimes(busca);

        return res.json(resultado);
    }

    const pagina = Number(req.query.pagina);
    if (!pagina) throw new AppError('O parâmetro pagina é obrigatório', 400);

    const resultado = await listarTimesPaginado({ busca, pagina });

    return res.json(resultado);
};
