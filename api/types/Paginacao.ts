export interface ParametrosPaginacao {
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
