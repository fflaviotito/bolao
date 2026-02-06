import * as S from './style';
import { useState } from 'react';
import { useBuscaPaginada } from '@/hooks/useBuscaPaginada';
import PaginasAdmin from '@/layouts/PaginasAdmin';
import FormNovoCampeonato from './FormNovoCampeonato';

interface Campeonatos {
    ano: number;
    divisao: string;
    id: number;
    nome: string;
    dataInicio: Date;
    dataFim: Date;
}

const CampeonatosAdmin = () => {
    const [modalAberto, setModalAberto] = useState(false);
    const {
        busca,
        dados: campeonatos,
        pagina,
        recarregar,
        setBusca,
        setPagina,
        totalRegistros
    } = useBuscaPaginada<Campeonatos>('/campeonatos');

    const calcularStatus = (inicio: Date, fim: Date) => {
        const hoje = new Date();

        if (hoje < new Date(inicio)) return 'Em breve';
        if (hoje > new Date(fim)) return 'Finalizado';
        return 'Ativo';
    };

    return (
        <S.Container>
            <PaginasAdmin
                titulo="Campeonatos"
                aoClicarAdicionar={() => setModalAberto(true)}
                aoClicarApagarBarraPesquisa={() => setBusca('')}
                aoDigitarBarraPesquisa={(evento) => setBusca(evento.target.value)}
                valorBarraPesquisa={busca}
                aoMudarPaginacao={setPagina}
                paginacaoAtual={pagina}
                totalRegistroPaginacao={totalRegistros}
            >
                <S.TabelaContainer>
                    <S.Tabela>
                        <thead>
                            <tr>
                                <th style={{ width: '50px' }}>ID</th>
                                <th>Nome</th>
                                <th>Divisão</th>
                                <th>Ano</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campeonatos.map((campeonato) => (
                                <tr
                                    key={campeonato.id}
                                    onClick={() => console.log('Clicou no', campeonato.id)}
                                >
                                    <td>#{campeonato.id}</td>
                                    <td style={{ fontWeight: 'bold', color: '#0f172a' }}>
                                        {campeonato.nome}
                                    </td>
                                    <td>{campeonato.divisao}</td>
                                    <td>{campeonato.ano}</td>
                                    <td>
                                        <S.PilulaStatus
                                            $tipo={
                                                calcularStatus(
                                                    campeonato.dataInicio,
                                                    campeonato.dataFim
                                                ) === 'Ativo'
                                                    ? 'ativo'
                                                    : 'finalizado'
                                            }
                                        >
                                            {calcularStatus(
                                                campeonato.dataInicio,
                                                campeonato.dataFim
                                            )}
                                        </S.PilulaStatus>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </S.Tabela>
                </S.TabelaContainer>
            </PaginasAdmin>
            <FormNovoCampeonato
                aberto={modalAberto}
                aoCriar={recarregar}
                aoFechar={() => setModalAberto(false)}
            />
        </S.Container>
    );
};

export default CampeonatosAdmin;
