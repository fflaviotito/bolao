import { selecionarEstadioPorId } from '../../repositories/estadioRepository';
import { AppError } from '../../utils/AppError';

export const conferirEstadio = async (estadioId: string) => {
    const estadioExiste = await selecionarEstadioPorId(estadioId);
    if (!estadioExiste) {
        throw new AppError('O estádio informado não foi encontrado.', 404);
    }

    return estadioExiste;
};
