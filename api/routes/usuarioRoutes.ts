import { Router } from 'express';
import { criarUsuario } from '../controllers/usuarioController';

const usuarioRouter = Router();

usuarioRouter.post('/registrar', criarUsuario);

export default usuarioRouter;
