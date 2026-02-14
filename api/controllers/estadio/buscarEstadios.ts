import type { Request, Response } from 'express';
import { PaginacaoQuery } from '../../types/Paginacao';
import { AppError } from '../../utils/AppError';
import { listarEstadiosPaginado } from '../../services/estadio/listarEstadiosPaginado';
import { listarEstadios } from '../../services/estadio/listarEstadios';

export const buscarEstadios = async (
    req: Request<unknown, unknown, unknown, PaginacaoQuery>,
    res: Response
) => {
    const paginar = req.query.paginar;
    if (!paginar) throw new AppError('O parâmetro paginar é obrigatório', 400);

    const busca = req.query.busca as string;

    if (paginar === 'false') {
        const resultado = await listarEstadios(busca);

        return res.json(resultado);
    }

    const pagina = Number(req.query.pagina);
    if (!pagina) throw new AppError('O parâmetro pagina é obrigatório', 400);

    const resultado = await listarEstadiosPaginado({ busca, pagina });

    return res.json(resultado);
};
