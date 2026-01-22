import * as S from './style';
import { Search, Filter, Plus } from 'lucide-react';
import Botao from '../../../components/Botao';
import { useState } from 'react';
import FormNovoCampeonato from './FormNovoCampeonato';

const dadosFicticios = [
    { id: 1, nome: 'Campeonato Brasileiro', ano: 2024, divisao: 'Série A', status: 'Finalizado' },
    { id: 2, nome: 'Campeonato Brasileiro', ano: 2025, divisao: 'Série A', status: 'Inativo' },
    { id: 3, nome: 'Campeonato Brasileiro', ano: 2026, divisao: 'Série A', status: 'Ativo' }
];

const CampeonatosAdmin = () => {
    const [modalAberto, setModalAberto] = useState(true);

    return (
        <S.Container>
            <S.Cabecalho>
                <h1>Campeonatos</h1>
                <div>
                    <Botao
                        tipo="button"
                        variante="adicionar"
                        texto="Novo"
                        icone={<Plus strokeWidth={3} />}
                        aoClicar={() => setModalAberto(true)}
                    />
                </div>
            </S.Cabecalho>
            <S.Filtros>
                <div className="barra-busca">
                    <label htmlFor="buscar">{<Search size={28} />}</label>
                    <input type="text" name="buscar" id="buscar" />
                </div>
                <div className="btn-filtro">
                    <Botao tipo="button" texto="Filtros" variante="filtro" icone={<Filter />} />
                </div>
            </S.Filtros>
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
                                            campeonato.status === 'Ativo' ? 'ativo' : 'finalizado'
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
            <S.Paginacao>
                <div className="info-itens">
                    <p>
                        Mostrando <span>{dadosFicticios.length}</span> registro
                        {dadosFicticios.length !== 1 && 's'}
                    </p>
                </div>
                <div className="controles-paginacao">
                    <Botao tipo="button" texto="Anterior" variante="paginacao" />
                    <span>1</span>
                    <Botao tipo="button" texto="Próximo" variante="paginacao" />
                </div>
            </S.Paginacao>
            <FormNovoCampeonato aberto={modalAberto} aoFechar={() => setModalAberto(false)} />
        </S.Container>
    );
};

export default CampeonatosAdmin;
