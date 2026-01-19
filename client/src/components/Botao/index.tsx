import type { JSX } from 'react';
import { BotaoEstilizado } from './style';

interface BotaoProps {
    tipo: 'button' | 'submit' | 'reset';
    texto?: string;
    variante: 'principal' | 'filtro' | 'adicionar';
    icone?: JSX.Element;
}

const Botao = ({ tipo, texto, variante, icone }: BotaoProps) => {
    return (
        <BotaoEstilizado type={tipo} $variante={variante}>
            {icone}{texto}
        </BotaoEstilizado>
    );
};

export default Botao;
