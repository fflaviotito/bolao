import { selecionarCampeonatoPorId } from '../../repositories/campeonatoRepository';
import { AppError } from '../../utils/AppError';

export const obterCampeonato = async (idCampeonato: string) => {
    const campeonato = await selecionarCampeonatoPorId(idCampeonato);
    if (!campeonato) throw new AppError('Campeonato não encontrado', 404);
    return campeonato;
};
