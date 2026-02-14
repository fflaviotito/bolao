import type { BarraPesquisaProps } from '@/components/BarraPesquisa';
import type { PaginacaoProps } from '@/components/Paginacao';
import { useEffect, type ReactNode } from 'react';
import * as S from './style';
import { Plus } from 'lucide-react';
import { BarraPesquisa, Botao, Paginacao } from '@/components';

interface PaginasAdminProps {
    aoClicarAdicionar: () => void;
    barraPesquisa: BarraPesquisaProps;
    children: ReactNode;
    paginacao: PaginacaoProps;
    titulo: string;
}

const PaginasAdmin = ({
    aoClicarAdicionar,
    barraPesquisa,
    children,
    paginacao,
    titulo
}: PaginasAdminProps) => {
    useEffect(() => {
        document.title = 'Bolão | Painel de administração';
    }, []);

    return (
        <>
            <S.Cabecalho>
                <h1>{titulo}</h1>
                <Botao
                    tipo="button"
                    variante="primario"
                    texto="Novo"
                    icone={<Plus strokeWidth={3} />}
                    aoClicar={aoClicarAdicionar}
                />
            </S.Cabecalho>
            <BarraPesquisa
                aoDigitar={barraPesquisa.aoDigitar}
                aoLimpar={barraPesquisa.aoLimpar}
                aoPressionarEnter={barraPesquisa.aoPressionarEnter}
                valor={barraPesquisa.valor}
            />
            {children}
            <Paginacao
                pagina={paginacao.pagina}
                setPagina={paginacao.setPagina}
                totalRegistros={paginacao.totalRegistros}
            />
        </>
    );
};

export default PaginasAdmin;
