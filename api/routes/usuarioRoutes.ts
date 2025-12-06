import { Router } from 'express';
import {
    atualizarSenha,
    conferirToken,
    criarUsuario,
    esqueciSenha,
    login
} from '../controllers/usuarioController';

const usuarioRouter = Router();

usuarioRouter.post('/entrar', login);
usuarioRouter.post('/registrar', criarUsuario);
usuarioRouter.post('/esqueci-senha', esqueciSenha);
usuarioRouter.post('/validar-codigo', conferirToken);
usuarioRouter.post('/redefinir-senha', atualizarSenha);

export default usuarioRouter;
