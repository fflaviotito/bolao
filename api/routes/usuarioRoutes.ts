import { Router } from 'express';
import { criarUsuario, login } from '../controllers/usuarioController';

const usuarioRouter = Router();

usuarioRouter.post('/entrar', login);
usuarioRouter.post('/registrar', criarUsuario);

export default usuarioRouter;
