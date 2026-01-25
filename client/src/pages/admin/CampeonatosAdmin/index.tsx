import * as S from './style';
import { useState } from 'react';
import FormNovoCampeonato from './FormNovoCampeonato';
import PaginasAdmin from '../../../layouts/PaginasAdmin';

const dadosFicticios = [
    { id: 1, nome: 'Campeonato Brasileiro', ano: 2024, divisao: 'Série A', status: 'Finalizado' },
    { id: 2, nome: 'Campeonato Brasileiro', ano: 2025, divisao: 'Série A', status: 'Inativo' },
    { id: 3, nome: 'Campeonato Brasileiro', ano: 2026, divisao: 'Série A', status: 'Ativo' }
];

const CampeonatosAdmin = () => {
    const [modalAberto, setModalAberto] = useState(false);
    const [barraPesquisa, setBarraPesquisa] = useState('');
    const [pagina, setPagina] = useState(1);

    return (
        <S.Container>
            <PaginasAdmin
                titulo="Campeonatos"
                aoClicarAdicionar={() => setModalAberto(true)}
                aoClicarApagarBarraPesquisa={() => setBarraPesquisa('')}
                aoDigitarBarraPesquisa={(evento) => setBarraPesquisa(evento.target.value)}
                valorBarraPesquisa={barraPesquisa}
                aoMudarPaginacao={setPagina}
                paginacaoAtual={pagina}
                totalRegistroPaginacao={dadosFicticios.length}
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
                            {dadosFicticios.map((campeonato) => (
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
                                                campeonato.status === 'Ativo'
                                                    ? 'ativo'
                                                    : 'finalizado'
                                            }
                                        >
                                            {campeonato.status}
                                        </S.PilulaStatus>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </S.Tabela>
                </S.TabelaContainer>
            </PaginasAdmin>
            <FormNovoCampeonato aberto={modalAberto} aoFechar={() => setModalAberto(false)} />
        </S.Container>
    );
};

export default CampeonatosAdmin;
