import { CONFIG_PAGINACAO } from '../../constants/config';
import { FiltroListagem, RetornoPaginado } from '../../types/Paginacao';
import { Estadio } from '@prisma/client';
import { selecionarEstadiosPaginado } from '../../repositories/estadioRepository';

export const listarEstadiosPaginado = async ({
    busca,
    limite = CONFIG_PAGINACAO.itensPorPagina,
    pagina
}: FiltroListagem): Promise<RetornoPaginado<Estadio>> => {
    const skip = (pagina - 1) * limite;

    const { total, estadios } = await selecionarEstadiosPaginado({
        skip,
        take: limite,
        busca
    });

    return {
        dados: estadios,
        paginacao: {
            itensPorPagina: limite,
            totalPaginas: Math.ceil(total / limite),
            totalRegistros: total
        }
    };
};
