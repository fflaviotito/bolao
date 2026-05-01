import { Router } from 'express';
import { garantirAuth, garantirAdmin } from '../middlewares/authMiddleware';
import { buscarCampeonato } from '../controllers/campeonato/buscarCampeonato';
import { buscarCampeonatos } from '../controllers/campeonato/buscarCampeonatos';
import { criarCampeonato } from '../controllers/campeonato/criarCampeonato';
import { criarConfiguracoesCampeonato } from '../controllers/campeonato/criarConfiguracoesCampeonato';

const campeonatoRouter = Router();

campeonatoRouter.get('/campeonato/:id', garantirAuth, buscarCampeonato);
campeonatoRouter.get('/campeonatos', garantirAuth, buscarCampeonatos);
campeonatoRouter.post('/admin/campeonatos', garantirAuth, garantirAdmin, criarCampeonato);
campeonatoRouter.post('/admin/campeonatos/:campeonatoId/configuracoes', garantirAuth, garantirAdmin, criarConfiguracoesCampeonato);

export default campeonatoRouter;
