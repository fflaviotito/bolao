import {
    inserirCampanha,
    selecionarCampanhaPorTimeCampeonato
} from '../../repositories/timeCampeonatoRepository';
import { AppError } from '../../utils/AppError';

interface DadosNovaCampanha {
    campeonatoId: string;
    timeId: string;
    criadoPorId: string;
}

export const registrarTimeEmCampeonato = async (dados: DadosNovaCampanha) => {
    const campanhaExiste = await selecionarCampanhaPorTimeCampeonato(
        dados.campeonatoId,
        dados.timeId
    );
    if (campanhaExiste) throw new AppError('O time já está cadastrado neste campeonato.', 409);

    return await inserirCampanha(dados);
};
