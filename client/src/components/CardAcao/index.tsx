import type { JSX } from 'react';
import * as S from './style';

interface CardAcaoProps {
    aoClicar: () => void;
    descricao: string;
    titulo: string;
    icone?: JSX.Element;
}

const CardAcao = ({ aoClicar, descricao, titulo, icone }: CardAcaoProps) => {
    return (
        <S.BotaoCard onClick={aoClicar}>
            {icone}
            <S.AreaTexto>
                <span>{titulo}</span>
                <span>{descricao}</span>
            </S.AreaTexto>
        </S.BotaoCard>
    );
};

export default CardAcao;
