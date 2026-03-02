import type { Request, Response } from 'express';
import { removerCampanha } from '../../services/timeCampeonato/removerCampanha';

export const excluirCampanha = async (req: Request, res: Response) => {
    const { campeonatoId, timeId } = req.params;

    await removerCampanha(campeonatoId, timeId);

    return res.status(204).send();
};
