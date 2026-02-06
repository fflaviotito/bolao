import { useCarregando } from '@/contexts/CarregandoContext';
import api from '@/services/api';
import { tratarErro } from '@/utils/tratarErro';
import { useCallback, useEffect, useState } from 'react';

interface Parametros {
    busca?: string;
    pagina: number;
}

export const useBuscaPaginada = <T>(urlGet: string) => {
    const { mostrarCarregando, esconderCarregando } = useCarregando();

    const [dados, setDados] = useState<T[]>([]);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const [pagina, setPagina] = useState(1);
    const [busca, setBusca] = useState('');

    const buscarDados = useCallback(async () => {
        try {
            mostrarCarregando();

            const params: Parametros = { pagina };
            // if (busca) params.busca = busca;

            const resultado = await api.get(urlGet, { params });

            setDados(resultado.data.dados);
            setTotalRegistros(resultado.data.paginacao.totalRegistros);
        } catch (error) {
            tratarErro(error);
        } finally {
            esconderCarregando();
        }
    }, [urlGet, pagina, mostrarCarregando, esconderCarregando]);

    const aoMudarBusca = (valor: string) => {
        setBusca(valor);
        setPagina(1);
    };

    useEffect(() => {
        buscarDados();
    }, [buscarDados]);

    return {
        dados,
        totalRegistros,
        pagina,
        setPagina,
        busca,
        setBusca: aoMudarBusca,
        recarregar: buscarDados
    };
};
