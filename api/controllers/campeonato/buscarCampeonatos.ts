import { Request, Response } from 'express';
import { listarCampeonatos } from '../../services/campeonato/listarCampeonatos';
import { AppError } from '../../utils/AppError';

interface ConsultaQuery {
    busca?: string;
    pagina?: number;
}

export const buscarCampeonatos = async (
    req: Request<unknown, unknown, unknown, ConsultaQuery>,
    res: Response
) => {
    const pagina = Number(req.query.pagina);
    const busca = req.query.busca as string;

    if (!pagina) throw new AppError('O parâmetro pagina é obrigatório', 400);

    const resultado = await listarCampeonatos({ busca, pagina });

    return res.json(resultado);
};
