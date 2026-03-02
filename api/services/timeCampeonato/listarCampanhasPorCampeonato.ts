import { selecionarTodasCampanhasPorCampeonato } from '../../repositories/timeCampeonatoRepository';

export const listarCampanhasPorCampeonato = async (campeonatoId: string) => {
    return await selecionarTodasCampanhasPorCampeonato(campeonatoId);
};
