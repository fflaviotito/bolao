import { inserirTime, selecionarTimePorNome } from '../../repositories/timeRepository';
import { AppError } from '../../utils/AppError';
import { conferirEstadio } from '../estadio/conferirEstadio';

interface DadosNovoTime {
    criadoPorId: string;
    escudo: string;
    estadioId?: string | null;
    nomeOficial?: string | null;
    nomePopular: string;
    sigla: string;
}

export const registrarTime = async (dados: DadosNovoTime) => {
    const timeExiste = await selecionarTimePorNome(dados.nomePopular, dados.nomeOficial);
    if (timeExiste) throw new AppError('Já existe um time com este nome.', 409);

    if (dados.estadioId) {
        await conferirEstadio(dados.estadioId);
    }

    return await inserirTime(dados);
};
