import { useNavigate, useParams } from 'react-router-dom';
import { useCarregando } from '@/contexts/CarregandoContext';
import { useEffect, useState } from 'react';
import api from '@/services/api';
import { tratarErro } from '@/utils';
import * as S from './style';
import { CardAcao } from '@/components';
import { Calendar, Medal, Settings, Shield } from 'lucide-react';

interface Campeonato {
    ano: number;
    divisao: string;
    id: number;
    nome: string;
    dataInicio: Date;
    dataFim: Date;
}

const cards = [
    {descricao: 'Vincular ou remover times', icone: <Shield />, titulo: 'Participantes', url: 'times'},
    {descricao: 'Criar e atualizar jogos', icone: <Calendar />, titulo: 'Rodadas', url: 'jogos'},
    {descricao: 'Gerir tabela do campeonato', icone: <Medal />, titulo: 'Classificação', url: 'classificacao'},
    {descricao: 'Editar dados e regras', icone: <Settings />, titulo: 'Configurações', url: 'configuracoes'}
]

const PainelCampeonatoAdmin = () => {
    const navegacao = useNavigate();
    const { mostrarCarregando, esconderCarregando } = useCarregando();
    const [campeonato, setCampeonato] = useState<Campeonato>();
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        const buscarCampeonato = async () => {
            try {
                mostrarCarregando();

                const resposta = await api.get(`/campeonato/${id}`);
                setCampeonato(resposta.data);
            } catch (error) {
                tratarErro(error);
            } finally {
                esconderCarregando();
            }
        };

        buscarCampeonato();
    }, [id, mostrarCarregando, esconderCarregando]);

    if (!campeonato) return null;

    const urlPadrao = `/admin/campeonatos/${id}/`

    return (
        <S.Container>
            <S.Cabecalho>
                <h1>
                    {campeonato.nome} {campeonato.ano}
                </h1>
                <p>{campeonato.divisao}</p>
            </S.Cabecalho>
            <h2>O que você deseja gerenciar?</h2>
            <S.GridBotoes>
                {cards.map((card) => (
                    <CardAcao
                        aoClicar={() => navegacao(`${urlPadrao}${card.url}`)}
                        descricao={card.descricao}
                        titulo={card.titulo}
                        icone={card.icone}
                        key={card.titulo}
                    />
                ))}
            </S.GridBotoes>
        </S.Container>
    );
};

export default PainelCampeonatoAdmin;
