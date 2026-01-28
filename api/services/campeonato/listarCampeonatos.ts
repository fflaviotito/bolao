import { selecionarCampeonatosPaginado } from '../../repositories/campeonatoRepository';

export const listarCampeonatos = async (pagina: number = 1, limite: number = 25) => {
    const { total, campeonatos } = await selecionarCampeonatosPaginado(pagina, limite);

    const totalPaginas = Math.ceil(total / limite);

    return {
        campeonatos: campeonatos,
        meta: {
            totalRegistros: total,
            totalPaginas: totalPaginas,
            paginaAtual: pagina,
            itensPorPagina: limite
        }
    };
};