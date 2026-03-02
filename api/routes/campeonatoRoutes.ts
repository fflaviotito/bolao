import { Router } from 'express';
import { garantirAuth, garantirAdmin } from '../middlewares/authMiddleware';
import { buscarCampeonato } from '../controllers/campeonato/buscarCampeonato';
import { buscarCampeonatos } from '../controllers/campeonato/buscarCampeonatos';
import { criarCampeonato } from '../controllers/campeonato/criarCampeonato';

const campeonatoRouter = Router();

campeonatoRouter.get('/campeonato/:id', garantirAuth, buscarCampeonato);
campeonatoRouter.get('/campeonatos', garantirAuth, buscarCampeonatos);
campeonatoRouter.post('/admin/campeonatos', garantirAuth, garantirAdmin, criarCampeonato);

export default campeonatoRouter;
