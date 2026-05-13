import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            codigo: err.statusCode,
            mensagem: err.message,
            ...(err.errors && { erros: err.errors })
        });
    }

    console.error('Erro Interno:', err);

    return res.status(500).json({
        codigo: 500,
        mensagem: 'Ocorreu um erro inesperado no servidor.'
    });
};
