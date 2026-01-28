import * as S from './style';
import { useCallback, useEffect, useState } from 'react';
import FormNovoCampeonato from './FormNovoCampeonato';
import PaginasAdmin from '../../../layouts/PaginasAdmin';
import { useCarregando } from '../../../contexts/CarregandoContext';
import { toast } from 'react-toastify';
import api from '../../../services/api';

interface Campeonatos {
    ano: number;
    divisao: string;
    id: number;
    nome: string;
    dataInicio: Date;
    dataFim: Date;
}

const CampeonatosAdmin = () => {
    const { mostrarCarregando, esconderCarregando } = useCarregando();
    const [modalAberto, setModalAberto] = useState(false);
    const [barraPesquisa, setBarraPesquisa] = useState('');
    const [pagina, setPagina] = useState(1);
    const [campeonatos, setCampeonatos] = useState<Campeonatos[]>([]);
    const [totalRegistros, setTotalRegistros] = useState(0);

    const buscarCampeonatos = useCallback(async () => {
        try {
            mostrarCarregando();

            const resultado = await api.get('/campeonatos', {
                params: {
                    pagina: pagina
                }
            });

            setCampeonatos(resultado.data.campeonatos);
            setTotalRegistros(resultado.data.meta.totalRegistros);
        } catch (error) {
            toast.error('Erro ao carregar campeonatos.');
            console.error(error);
        } finally {
            esconderCarregando();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagina]);

    useEffect(() => {
        buscarCampeonatos();
    }, [buscarCampeonatos]);

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
                aoClicarApagarBarraPesquisa={() => setBarraPesquisa('')}
                aoDigitarBarraPesquisa={(evento) => setBarraPesquisa(evento.target.value)}
                valorBarraPesquisa={barraPesquisa}
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
                aoCriar={buscarCampeonatos}
                aoFechar={() => setModalAberto(false)}
            />
        </S.Container>
    );
};

export default CampeonatosAdmin;
