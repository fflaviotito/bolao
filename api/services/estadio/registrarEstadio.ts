import { inserirEstadio, selecionarEstadioPorNome } from '../../repositories/estadioRepository';
import { AppError } from '../../utils/AppError';

interface DadosNovoEstadio {
    nomePopular: string;
    criadoPorId: string;
    nomeOficial?: string | null;
}

export const registrarEstadio = async (dados: DadosNovoEstadio) => {
    const estadioExiste = await selecionarEstadioPorNome(dados.nomePopular, dados.nomeOficial);
    if (estadioExiste) throw new AppError('Já existe um estádio com este nome.', 409);

    return await inserirEstadio(dados);
};
