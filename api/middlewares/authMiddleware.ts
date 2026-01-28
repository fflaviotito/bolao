import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';
import { JwtPayload, verify } from 'jsonwebtoken';
import { selecionarUsuarioPorId } from '../repositories/usuarioRepository';

interface DadosToken extends JwtPayload {
    sub: string;
}

export const garantirAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!process.env.JWT_SECRET) throw new AppError('Erro interno de configuração (JWT)', 500);

    const cabecalhoAutenticacao = req.headers.authorization;
    if (!cabecalhoAutenticacao) {
        throw new AppError('Token de autenticação ausente', 401);
    }

    const [, token] = cabecalhoAutenticacao.split(' ');

    try {
        const secreto = process.env.JWT_SECRET;
        const decodificado = verify(token, secreto) as DadosToken;

        req.usuarioId = Number(decodificado.sub);

        return next();
    } catch (error) {
        throw new AppError('Token inválido ou expirado', 401);
    }
};

export const garantirAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { usuarioId } = req;

    if (!usuarioId)
        throw new AppError('Erro interno: Verificação de admin sem autenticação prévia', 500);

    const usuario = await selecionarUsuarioPorId(usuarioId);
    if (!usuario) throw new AppError('Usuário não encontrado.', 401);
    if (usuario.papel !== 'admin') throw new AppError('Acesso negado!', 403);
    
    return next();
};
