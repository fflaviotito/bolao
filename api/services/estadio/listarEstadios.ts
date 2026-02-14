import { selecionarTodosEstadios } from '../../repositories/estadioRepository';

export const listarEstadios = async (busca: string, limite: number = 100) => {
    return await selecionarTodosEstadios(busca, limite);
};
