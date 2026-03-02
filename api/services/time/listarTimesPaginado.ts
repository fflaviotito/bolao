import { CONFIG_PAGINACAO } from '../../constants/config';
import { FiltroListagem, RetornoPaginado } from '../../types/Paginacao';
import { Time } from '@prisma/client';
import { selecionarTimesPaginado } from '../../repositories/timeRepository';

export const listarTimesPaginado = async ({
    busca,
    limite = CONFIG_PAGINACAO.itensPorPagina,
    pagina
}: FiltroListagem): Promise<RetornoPaginado<Time>> => {
    const skip = (pagina - 1) * limite;

    const { total, times } = await selecionarTimesPaginado({
        skip,
        take: limite,
        busca
    });

    return {
        dados: times,
        paginacao: {
            itensPorPagina: limite,
            totalPaginas: Math.ceil(total / limite),
            totalRegistros: total
        }
    };
};
