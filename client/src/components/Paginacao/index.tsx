import * as S from './style';

export interface PaginacaoProps {
    itensPorPagina?: number;
    pagina: number;
    setPagina: React.Dispatch<React.SetStateAction<number>>;
    totalRegistros: number;
}

const Paginacao = ({
    setPagina,
    itensPorPagina = 25,
    pagina,
    totalRegistros
}: PaginacaoProps) => {
    const totalPaginas = Math.ceil(totalRegistros / itensPorPagina);
    const primeiroItem = (pagina - 1) * itensPorPagina + 1;
    const ultimoItem = Math.min(pagina * itensPorPagina, totalRegistros);

    const anterior = () => {
        if (pagina > 1) setPagina(pagina - 1);
    };

    const proximo = () => {
        if (pagina < totalPaginas) setPagina(pagina + 1);
    };

    if (totalRegistros === 0) return null;

    return (
        <S.Container>
            <S.Info>
                Mostrando <span>{primeiroItem}</span> a <span>{ultimoItem}</span> de{' '}
                <span>{totalRegistros}</span> resultados
            </S.Info>
            <S.Controles>
                <button type="button" onClick={anterior} disabled={pagina === 1}>
                    Anterior
                </button>
                <span>
                    {pagina} de {totalPaginas}
                </span>
                <button type="button" onClick={proximo} disabled={pagina === totalPaginas}>
                    Anterior
                </button>
            </S.Controles>
        </S.Container>
    );
};

export default Paginacao;
