import {
    inserirCampeonato,
    selecionarCampeonatoPorNomeDivisaoAno
} from '../../repositories/campeonatoRepository';
import { AppError } from '../../utils/AppError';

interface DadosNovoCampeonato {
    nome: string;
    divisao: string;
    ano: number;
    dataInicio: Date;
    dataFim: Date;
    criadoPorId: number;
}

export const registrarCampeonato = async (dados: DadosNovoCampeonato) => {
    if (dados.dataInicio >= dados.dataFim) {
        throw new AppError('A data de fim deve ser posterior a data de inicio', 400, {
            dataFim: ['A data de fim deve ser posterior a data de inicio']
        });
    }

    const campeonatoExiste = await selecionarCampeonatoPorNomeDivisaoAno(
        dados.nome,
        dados.divisao,
        dados.ano
    );
    if (campeonatoExiste)
        throw new AppError('Já existe um campeonato com este nome, divisão e ano.', 409);

    return await inserirCampeonato(dados);
};
