import { Campeonato } from '@prisma/client';
import {
    selecionarCampeonatoPorId,
    selecionarRegrasConfiguracoes
} from '../../repositories/campeonatoRepository';
import { AppError } from '../../utils/AppError';

export const obterConfiguracoes = async (campeonatoId: Campeonato['id']) => {
    const campeonatoExiste = await selecionarCampeonatoPorId(campeonatoId);
    if (!campeonatoExiste) throw new AppError('Campeonato não existe.', 404);

    const { configuracoes, regras } = await selecionarRegrasConfiguracoes(campeonatoId);

    return { configuracoes, regras };
};
