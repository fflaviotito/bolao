import { Campeonato } from '@prisma/client';
import { CONFIG_PAGINACAO } from '../../constants/config';
import { selecionarCampeonatosPaginado } from '../../repositories/campeonatoRepository';
import { RetornoPaginado } from '../../types/Paginacao';

interface Parametros {
    busca: string;
    limite?: number;
    pagina: number;
}

export const listarCampeonatos = async ({
    busca,
    limite = CONFIG_PAGINACAO.itensPorPagina,
    pagina
}: Parametros): Promise<RetornoPaginado<Campeonato>> => {
    const skip = (pagina - 1) * limite;

    const { total, campeonatos } = await selecionarCampeonatosPaginado({
        skip,
        take: limite,
        busca
    });

    return {
        dados: campeonatos,
        paginacao: {
            itensPorPagina: limite,
            totalPaginas: Math.ceil(total / limite),
            totalRegistros: total
        }
    };
};
