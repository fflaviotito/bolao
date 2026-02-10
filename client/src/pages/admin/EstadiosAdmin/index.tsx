import { useState } from 'react';
import { useBuscaPaginada } from '@/hooks/useBuscaPaginada';
import * as S from '@/styles/TabelasAdmin';
import PaginasAdmin from '@/layouts/PaginasAdmin';
import FormNovoEstadio from './FormNovoEstadio';

interface Estadios {
    id: string
    nomeOficial: string;
    nomePopular: string;
}

const EstadiosAdmin = () => {
    const [modalAberto, setModalAberto] = useState(false);
    const {
        busca,
        dados: estadios,
        pagina,
        recarregar,
        setPagina,
        totalRegistros
    } = useBuscaPaginada<Estadios>('/estadios');

    return (
        <S.Container>
            <PaginasAdmin
                titulo="Estádios"
                aoClicarAdicionar={() => setModalAberto(true)}
                aoClicarApagarBarraPesquisa={busca.aoLimpar}
                aoDigitarBarraPesquisa={busca.aoDigitar}
                aoPressionarEnter={busca.aoPressionarEnter}
                valorBarraPesquisa={busca.valor}
                aoMudarPaginacao={setPagina}
                paginacaoAtual={pagina}
                totalRegistroPaginacao={totalRegistros}
            >
                <S.TabelaContainer>
                    <S.Tabela>
                        <thead>
                            <tr>
                                <th style={{ width: '50px' }}>Nº</th>
                                <th>Nome Popular</th>
                                <th>Nome Oficial</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estadios.map((estadio, index) => (
                                <tr
                                    key={estadio.id}
                                >
                                    <td>{(pagina - 1) * 10 + index + 1}</td>
                                    <td>{estadio.nomePopular}</td>
                                    <td>{estadio.nomeOficial}</td>
                                </tr>
                            ))}
                        </tbody>
                    </S.Tabela>
                </S.TabelaContainer>
            </PaginasAdmin>
            <FormNovoEstadio
                aberto={modalAberto}
                aoFechar={() => setModalAberto(false)}
                aoSucesso={recarregar}
            />
        </S.Container>
    )
};

export default EstadiosAdmin;
