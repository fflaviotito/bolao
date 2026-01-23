import { Plus } from 'lucide-react';
import Botao from '../../components/Botao';
import * as S from './style';
import BarraPesquisa from '../../components/BarraPesquisa';
import type { ChangeEvent, ReactNode } from 'react';
import Paginacao from '../../components/Paginacao';

interface PaginasAdminProps {
    aoClicarAdicionar: () => void;
    aoClicarApagarBarraPesquisa: () => void;
    aoDigitarBarraPesquisa: (evento: ChangeEvent<HTMLInputElement>) => void;
    aoMudarPaginacao: (novaPagina: number) => void;
    children: ReactNode;
    paginacaoAtual: number;
    titulo: string;
    totalRegistroPaginacao: number;
    valorBarraPesquisa: string;
}

const PaginasAdmin = ({
    aoClicarAdicionar,
    aoClicarApagarBarraPesquisa,
    aoDigitarBarraPesquisa,
    aoMudarPaginacao,
    children,
    paginacaoAtual,
    titulo,
    totalRegistroPaginacao,
    valorBarraPesquisa
}: PaginasAdminProps) => {
    return (
        <>
            <S.Cabecalho>
                <h1>{titulo}</h1>
                <div>
                    <Botao
                        tipo="button"
                        variante="adicionar"
                        texto="Novo"
                        icone={<Plus strokeWidth={3} />}
                        aoClicar={aoClicarAdicionar}
                    />
                </div>
            </S.Cabecalho>
            <BarraPesquisa
                aoClicarApagar={aoClicarApagarBarraPesquisa}
                aoDigitar={aoDigitarBarraPesquisa}
                valor={valorBarraPesquisa}
            />
            {children}
            <Paginacao
                paginaAtual={paginacaoAtual}
                totalRegistros={totalRegistroPaginacao}
                aoMudarPagina={aoMudarPaginacao}
            />
        </>
    );
};

export default PaginasAdmin;
