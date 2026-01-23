import * as S from './style';

interface PaginacaoProps {
    aoMudarPagina: (novaPagina: number) => void;
    itensPorPagina?: number;
    paginaAtual: number;
    totalRegistros: number;
}

const Paginacao = ({
    aoMudarPagina,
    itensPorPagina = 25,
    paginaAtual,
    totalRegistros
}: PaginacaoProps) => {
    const totalPaginas = Math.ceil(totalRegistros / itensPorPagina);
    const primeiroItem = (paginaAtual - 1) * itensPorPagina + 1;
    const ultimoItem = Math.min(paginaAtual * itensPorPagina, totalRegistros);

    const anterior = () => {
        if (paginaAtual > 1) aoMudarPagina(paginaAtual - 1);
    };

    const proximo = () => {
        if (paginaAtual < totalPaginas) aoMudarPagina(paginaAtual + 1);
    };

    if (totalRegistros === 0) return null;

    return (
        <S.Container>
            <S.Info>
                Mostrando <span>{primeiroItem}</span> a <span>{ultimoItem}</span> de{' '}
                <span>{totalRegistros}</span> resultados
            </S.Info>
            <S.Controles>
                <button type="button" onClick={anterior} disabled={paginaAtual === 1}>
                    Anterior
                </button>
                <span>
                    {paginaAtual} de {totalPaginas}
                </span>
                <button type="button" onClick={proximo} disabled={paginaAtual === totalPaginas}>
                    Anterior
                </button>
            </S.Controles>
        </S.Container>
    );
};

export default Paginacao;
