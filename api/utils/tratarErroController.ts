import { Response } from 'express';
import { AppError } from './AppError';

export const tratarErroController = (res: Response, error: unknown) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            codigo: error.statusCode,
            mensagem: error.message,
            ...(error.errors && { erros: error.errors })
        });
    }

    console.error('Erro Interno:', error);

    return res.status(500).json({
        codigo: 500,
        status: 'erro_servidor',
        mensagem: 'Ocorreu um erro inesperado no servidor.'
    });
};
