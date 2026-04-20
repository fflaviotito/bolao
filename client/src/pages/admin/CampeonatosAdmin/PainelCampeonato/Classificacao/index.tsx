import { useEffect } from 'react';
import { useCarregando } from '@/contexts/CarregandoContext';
import { useParams } from 'react-router-dom';
import api from '@/services/api';
import { tratarErro } from '@/utils';

const ClassificacaoDoCampeonato = () => {
    const { esconderCarregando, mostrarCarregando } = useCarregando();
    const { id: campeonatoId } = useParams();
    useEffect(() => {
        const buscarCampanhas = async () => {
            try {
                mostrarCarregando();

                const resposta = await api.get(`/campeonatos/${campeonatoId}/times`);
                console.log(resposta);
            } catch (error) {
                tratarErro(error);
            } finally {
                esconderCarregando();
            }
        };

        buscarCampanhas();
    }, [campeonatoId, esconderCarregando, mostrarCarregando]);
};

export default ClassificacaoDoCampeonato;
