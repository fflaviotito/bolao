import { deletarCampanha } from '../../repositories/timeCampeonatoRepository';

export const removerCampanha = async (campeonatoId: string, timeId: string) => {
    return await deletarCampanha(campeonatoId, timeId);
};
