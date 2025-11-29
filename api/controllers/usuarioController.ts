import type { Request, Response } from 'express';
import { registrarUsuario } from '../services/usuario/registrarUsuario';
import { AppError } from '../utils/AppError';

export const criarUsuario = async (req: Request, res: Response) => {
    try {
        const { nome, email, senha, senhaConfirmacao } = req.body;

        const usuarioCriado = await registrarUsuario({
            nome,
            email,
            senhaPura: senha,
            senhaConfirmacao
        });

        return res.status(201).json(usuarioCriado);
    } catch (error: any) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                codigo: error.statusCode,
                status: 'erro_validacao',
                mensagem: error.message,
                ...(error.errors && { erros: error.errors })
            });
        }

        console.error(error);

        return res.status(500).json({
            codigo: 500,
            status: 'erro_servidor',
            mensagem: 'Ocorreu um erro inesperado no servidor.'
        });
    }
};
