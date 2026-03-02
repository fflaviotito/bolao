import { selecionarTodosTimes } from '../../repositories/timeRepository';

export const listarTimes = async (busca: string, limite: number = 100) => {
    return await selecionarTodosTimes(busca, limite);
};
