import type { JSX } from 'react';
import { BotaoEstilizado } from './style';

interface BotaoProps {
    tipo: 'button' | 'submit' | 'reset';
    texto: string;
    variante: 'principal' | 'adicionar';
    icone?: JSX.Element;
    aoClicar?: () => void;
}

const Botao = ({ aoClicar, tipo, texto, variante, icone }: BotaoProps) => {
    return (
        <BotaoEstilizado type={tipo} $variante={variante} onClick={aoClicar}>
            {icone}
            {texto}
        </BotaoEstilizado>
    );
};

export default Botao;
