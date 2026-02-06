import { Request, Response } from 'express';
import { listarCampeonatos } from '../../services/campeonato/listarCampeonatos';
import { AppError } from '../../utils/AppError';

interface ConsultaQuery {
    pagina?: number;
}

export const buscarCampeonatos = async (
    req: Request<unknown, unknown, unknown, ConsultaQuery>,
    res: Response
) => {
    const pagina = Number(req.query.pagina);

    if (!pagina) throw new AppError('O parâmetro pagina é obrigatório', 400)

    const resultado = await listarCampeonatos({ pagina });

    return res.json(resultado);
};
