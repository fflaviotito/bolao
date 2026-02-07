import { useCarregando } from '@/contexts/CarregandoContext';
import api from '@/services/api';
import { tratarErro } from '@/utils/tratarErro';
import { useCallback, useEffect, useState, type ChangeEvent, type KeyboardEvent } from 'react';

interface Parametros {
    pagina: number;
    busca?: string;
}

export const useBuscaPaginada = <T>(urlGet: string) => {
    const { mostrarCarregando, esconderCarregando } = useCarregando();
    const [dados, setDados] = useState<T[]>([]);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const [pagina, setPagina] = useState(1);
    const [buscaOficial, setBuscaOficial] = useState('');
    const [textoDigitado, setTextoDigitado] = useState('');

    const buscarDados = useCallback(async () => {
        try {
            mostrarCarregando();
            const params: Parametros = { pagina };

            if (buscaOficial.trim()) {
                params.busca = buscaOficial;
            }

            const resultado = await api.get(urlGet, { params });
            setDados(resultado.data.dados);
            setTotalRegistros(resultado.data.paginacao.totalRegistros);
        } catch (error) {
            tratarErro(error);
        } finally {
            esconderCarregando();
        }
    }, [urlGet, pagina, buscaOficial, mostrarCarregando, esconderCarregando]);

    useEffect(() => {
        buscarDados();
    }, [buscarDados]);

    const aoDigitar = (e: ChangeEvent<HTMLInputElement>) => {
        setTextoDigitado(e.target.value);
    };

    const confirmarBusca = () => {
        setBuscaOficial(textoDigitado);
        setPagina(1);
    };

    const aoPressionarEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            confirmarBusca();
        }
    };

    const limparBusca = () => {
        setTextoDigitado('');
        setBuscaOficial('');
        setPagina(1);
    };

    return {
        dados,
        totalRegistros,
        pagina,
        setPagina,
        recarregar: buscarDados,
        busca: {
            valor: textoDigitado,
            aoDigitar,
            aoConfirmar: confirmarBusca,
            aoPressionarEnter,
            aoLimpar: limparBusca
        }
    };
};
