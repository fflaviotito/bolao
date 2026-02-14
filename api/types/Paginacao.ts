export interface FiltroListagem {
    busca: string;
    limite?: number;
    pagina: number;
}

export interface PaginacaoQuery {
    busca?: string;
    pagina?: number;
    paginar?: 'true' | 'false';
}

export interface PaginacaoRepositorio {
    busca: string;
    skip: number;
    take: number;
}

export interface RetornoPaginado<T> {
    dados: T[];
    paginacao: {
        itensPorPagina: number;
        totalPaginas: number;
        totalRegistros: number;
    };
}
