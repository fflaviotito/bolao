import { useEffect, useState, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useCarregando } from '@/contexts/CarregandoContext';
import api from '@/services/api';
import { tratarErro } from '@/utils';
import * as S from './style';
import { Botao, SelectComBusca } from '@/components';
import { Minus, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

interface Times {
    id: string;
    nomePopular: string;
}

const TimesDoCampeonato = () => {
    const [timeId, setTimeId] = useState('');
    const [opcoesTimes, setOpcoesTimes] = useState<{ label: string; value: string }[]>([]);
    const [carregandoTimes, setCarregandoTimes] = useState(false);
    const [timesVinculados, setTimesVinculados] = useState<Times[]>([]);
    const { id: campeonatoId } = useParams();
    const { esconderCarregando, mostrarCarregando } = useCarregando();

    useEffect(() => {
        const buscarCampanhas = async () => {
            try {
                mostrarCarregando();

                const resposta = await api.get(`/campeonatos/${campeonatoId}/times`);

                const timesFormatados = resposta.data.map((item: { time: Times }) => ({
                    id: item.time.id,
                    nomePopular: item.time.nomePopular
                }));

                setTimesVinculados(timesFormatados);
            } catch (error) {
                tratarErro(error);
            } finally {
                esconderCarregando();
            }
        };

        const buscarTimes = async () => {
            try {
                setCarregandoTimes(true);

                const resposta = await api.get('/times', {
                    params: { paginar: false }
                });

                const timesFormatados = resposta.data.map((time: Times) => ({
                    label: time.nomePopular,
                    value: time.id
                }));

                setOpcoesTimes(timesFormatados);
            } catch (error) {
                tratarErro(error);
            } finally {
                setCarregandoTimes(false);
            }
        };

        buscarCampanhas();
        buscarTimes();
    }, [campeonatoId, mostrarCarregando, esconderCarregando]);

    const aoAdicionar = async (evento: FormEvent) => {
        evento.preventDefault();
        if (!timeId) return;

        try {
            await api.post(`/admin/campeonatos/${campeonatoId}/times`, {
                campeonatoId,
                timeId
            });

            const timeSelecionado = opcoesTimes.find((t) => t.value === timeId);
            if (timeSelecionado) {
                setTimesVinculados((prev) => [
                    ...prev,
                    {
                        id: timeSelecionado.value,
                        nomePopular: timeSelecionado.label
                    }
                ]);
            }

            toast.success('Time vinculado com sucesso!');
            setTimeId('');
        } catch (error) {
            tratarErro(error);
        }
    };

    const aoRemover = async (idTime: string) => {
        try {
            await api.delete(`/admin/campeonatos/${campeonatoId}/times/${idTime}`);

            setTimesVinculados((prevTimes) => prevTimes.filter((time) => time.id !== idTime));
            toast.success('Time excluído com sucesso!');
        } catch (error) {
            tratarErro(error);
        }
    };

    return (
        <S.Container>
            <S.Cabecalho>
                <h1>Gerenciar Participantes</h1>
                <p>Adicione ou remova times deste campeonato.</p>
            </S.Cabecalho>

            <S.Formulario onSubmit={aoAdicionar}>
                <SelectComBusca
                    label="Time"
                    name="timeId"
                    value={timeId}
                    onChange={setTimeId}
                    opcoes={opcoesTimes}
                    loading={carregandoTimes}
                    placeholder="Pequise o time..."
                />
                <Botao
                    tipo="submit"
                    variante="primario"
                    texto="Adicionar"
                    icone={<Plus strokeWidth={3} />}
                />
            </S.Formulario>

            {timesVinculados && timesVinculados.length > 0 && (
                <S.ListaTimes>
                    {timesVinculados.map((time) => (
                        <S.CardTime key={time.id}>
                            <span>{time.nomePopular}</span>

                            <S.BotaoRemover
                                type="button"
                                onClick={() => aoRemover(time.id)}
                                title={`Remover ${time.nomePopular}`}
                            >
                                <Minus size={20} strokeWidth={3} />
                            </S.BotaoRemover>
                        </S.CardTime>
                    ))}
                </S.ListaTimes>
            )}
        </S.Container>
    );
};

export default TimesDoCampeonato;
