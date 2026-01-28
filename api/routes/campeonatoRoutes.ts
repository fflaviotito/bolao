import { Router } from 'express';
import { criarCampeonato } from '../controllers/campeonato/criarCampeonato';
import { garantirAuth, garantirAdmin } from '../middlewares/authMiddleware';
import { buscarCampeonatos } from '../controllers/campeonato/buscarCampeonatos';

const campeonatoRouter = Router();

campeonatoRouter.get('/campeonatos', garantirAuth, buscarCampeonatos);
campeonatoRouter.post('/admin/campeonatos', garantirAuth, garantirAdmin, criarCampeonato);

export default campeonatoRouter;
