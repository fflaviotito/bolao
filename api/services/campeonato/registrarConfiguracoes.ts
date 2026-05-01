import { Campeonato, ConfiguracaoCampeonato, RegrasPontuacao, Usuario } from '@prisma/client';
import {
    inserirRegrasConfiguracoes,
    selecionarCampeonatoPorId
} from '../../repositories/campeonatoRepository';
import { AppError } from '../../utils/AppError';

interface RegistrarConfiguracoesProps {
    campeonatoId: Campeonato['id'];
    criadoPorId: Usuario['id'];
    configuracao: Pick<ConfiguracaoCampeonato, 'quantidadeRodadas' | 'quantidadeTimes'>;
    regras: Pick<
        RegrasPontuacao,
        | 'pontosEmpateExato'
        | 'pontosAcertoEmpate'
        | 'pontosAcertoVencedor'
        | 'pontosGolTime'
        | 'pontosPlacarExato'
    >;
}

export const registrarConfiguracoes = async ({
    campeonatoId,
    configuracao,
    criadoPorId,
    regras
}: RegistrarConfiguracoesProps) => {
    const campeonatoExiste = await selecionarCampeonatoPorId(campeonatoId);
    if (!campeonatoExiste) throw new AppError('Campeonato não encontrado.', 404);

    if (campeonatoExiste.status !== 'rascunho')
        throw new AppError('A configuração para este campeonato já foi criada.', 400);

    const dadosConfiguracao = {
        ...configuracao,
        campeonatoId,
        criadoPorId
    };

    const dadosRegras = {
        ...regras,
        campeonatoId,
        criadoPorId
    };

    const resultado = await inserirRegrasConfiguracoes(dadosConfiguracao, dadosRegras);

    return resultado;
};
