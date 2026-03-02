import type { Request, Response } from 'express';
import { listarCampanhasPorCampeonato } from '../../services/timeCampeonato/listarCampanhasPorCampeonato';

export const buscarCampanhasPorCampeonato = async (req: Request, res: Response) => {
    const { campeonatoId } = req.params;

    const resultado = await listarCampanhasPorCampeonato(campeonatoId);

    return res.json(resultado);
};
