import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            errors: err.errors,
            message: err.message
        });
    }

    console.error('Erro Interno:', err);

    return res.status(500).json({
        message: 'Internal server error - Ocorreu um erro inesperado.',
        status: 'error'
    });
};
