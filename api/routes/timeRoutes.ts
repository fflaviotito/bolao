import { Router } from 'express';
import { garantirAdmin, garantirAuth } from '../middlewares/authMiddleware';
import { buscarTimes } from '../controllers/time/buscarTimes';
import { criarTime } from '../controllers/time/criarTime';

const timeRouter = Router();

timeRouter.get('/times', garantirAuth, buscarTimes);
timeRouter.post('/admin/times', garantirAuth, garantirAdmin, criarTime);

export default timeRouter;
