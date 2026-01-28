import { Request, Response } from 'express';
import { listarCampeonatos } from '../../services/campeonato/listarCampeonatos';

export const buscarCampeonatos = async (req: Request, res: Response) => {
    const pagina = Number(req.query.pagina) || 1;

    const itensPorPagina = 25;

    const resultado = await listarCampeonatos(pagina, itensPorPagina);

    return res.json(resultado);
};
