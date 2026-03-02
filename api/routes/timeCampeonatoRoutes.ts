import { Router } from 'express';
import { garantirAdmin, garantirAuth } from '../middlewares/authMiddleware';
import { criarCampanha } from '../controllers/timeCampeonato/criarCampanha';
import { buscarCampanhasPorCampeonato } from '../controllers/timeCampeonato/buscarCampanhasPorCampeonato';
import { excluirCampanha } from '../controllers/timeCampeonato/excluirCampanha';

const timeCampeonatoRouter = Router();

timeCampeonatoRouter.get(
    '/campeonatos/:campeonatoId/times',
    garantirAuth,
    buscarCampanhasPorCampeonato
);
timeCampeonatoRouter.post(
    '/admin/campeonatos/:campeonatoId/times',
    garantirAuth,
    garantirAdmin,
    criarCampanha
);
timeCampeonatoRouter.delete(
    '/admin/campeonatos/:campeonatoId/times/:timeId',
    garantirAuth,
    garantirAdmin,
    excluirCampanha
);

export default timeCampeonatoRouter;
