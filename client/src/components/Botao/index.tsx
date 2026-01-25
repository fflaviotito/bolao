import type { JSX } from 'react';
import { BotaoEstilizado } from './style';

interface BotaoProps {
    aoClicar?: () => void;
    icone?: JSX.Element;
    larguraTotal?: boolean;
    texto: string;
    tipo: 'button' | 'submit' | 'reset';
    variante: 'principal' | 'primario' | 'secundario';
}

const Botao = ({ aoClicar, icone, larguraTotal = false, tipo, texto, variante }: BotaoProps) => {
    return (
        <BotaoEstilizado
            type={tipo}
            $variante={variante}
            onClick={aoClicar}
            $larguraTotal={larguraTotal}
        >
            {icone}
            {texto}
        </BotaoEstilizado>
    );
};

export default Botao;
