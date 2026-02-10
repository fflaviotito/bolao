import { Router } from 'express';
import { garantirAdmin, garantirAuth } from '../middlewares/authMiddleware';
import { buscarEstadios } from '../controllers/estadio/buscarEstadios';
import { criarEstadio } from '../controllers/estadio/criarEstadio';

const estadioRouter = Router();

estadioRouter.get('/estadios', garantirAuth, buscarEstadios);
estadioRouter.post('/admin/estadios', garantirAuth, garantirAdmin, criarEstadio);

export default estadioRouter;
