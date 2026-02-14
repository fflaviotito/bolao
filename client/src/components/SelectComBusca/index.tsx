import { useState, useRef, useEffect } from 'react';
import * as S from './style';
import { InputTexto } from '..';
import type { ErrosPorCampo } from '@/utils/formatarErrosZod';

interface Opcao {
    label: string;
    value: string;
}

interface SelectComBuscaProps {
    label: string;
    name: string;
    value: string;
    onChange: (valor: string) => void;
    opcoes: Opcao[];
    erros?: ErrosPorCampo;
    placeholder?: string;
    loading?: boolean;
}

const SelectComBusca = ({
    label,
    name,
    value,
    onChange,
    opcoes,
    erros,
    placeholder,
    loading
}: SelectComBuscaProps) => {
    const [busca, setBusca] = useState('');
    const [aberto, setAberto] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const errosDesteCampo = erros ? erros[name] : undefined;

    useEffect(() => {
        const itemSelecionado = opcoes.find((op) => op.value === value);
        const labelEsperada = itemSelecionado ? itemSelecionado.label : '';

        if (value && busca !== labelEsperada) {
            setBusca(labelEsperada);
        } else if (!value && busca !== '') {
            setBusca('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, opcoes]);

    const opcoesFiltradas = opcoes.filter((op) =>
        op.label.toLowerCase().includes(busca.toLowerCase())
    );

    useEffect(() => {
        function handleClickFora(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setAberto(false);
                const item = opcoes.find((op) => op.value === value);
                setBusca(item ? item.label : '');
            }
        }
        document.addEventListener('mousedown', handleClickFora);
        return () => document.removeEventListener('mousedown', handleClickFora);
    }, [value, opcoes]);

    return (
        <S.Container ref={wrapperRef}>
            <div onClick={() => setAberto(true)}>
                <InputTexto
                    label={label}
                    name={`search-${name}`}
                    value={busca}
                    onChange={(e) => {
                        setBusca(e.target.value);
                        setAberto(true);
                        if (e.target.value === '') onChange('');
                    }}
                    placeholder={loading ? 'Carregando...' : placeholder || 'Selecione...'}
                    autoComplete="off"
                />
            </div>

            {aberto && !loading && (
                <S.ListaFlutuante>
                    {opcoesFiltradas.length > 0 ? (
                        opcoesFiltradas.map((opcao) => (
                            <li
                                key={opcao.value}
                                onClick={() => {
                                    onChange(opcao.value);
                                    setBusca(opcao.label);
                                    setAberto(false);
                                }}
                            >
                                {opcao.label}
                            </li>
                        ))
                    ) : (
                        <li className="sem-resultados">Nenhum resultado encontrado</li>
                    )}
                </S.ListaFlutuante>
            )}
            {errosDesteCampo && (
                <S.ListaErros>
                    {errosDesteCampo.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </S.ListaErros>
            )}
        </S.Container>
    );
};

export default SelectComBusca;
