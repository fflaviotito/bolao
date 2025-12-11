import { BotaoEstilizado } from './style';

interface BotaoProps {
    tipo: 'button' | 'submit' | 'reset';
    texto: string;
    variante: 'principal';
}

const Botao = ({ tipo, texto, variante }: BotaoProps) => {
    return (
        <BotaoEstilizado type={tipo} $variante={variante}>
            {texto}
        </BotaoEstilizado>
    );
};

export default Botao;
