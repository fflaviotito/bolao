import { useRef, type ChangeEvent, type KeyboardEvent } from 'react';
import * as S from './style';
import { Search, X } from 'lucide-react';

export interface BarraPesquisaProps {
    aoConfirmar?: () => void;
    aoDigitar: (evento: ChangeEvent<HTMLInputElement>) => void;
    aoLimpar: () => void;
    aoPressionarEnter: (evento: KeyboardEvent<HTMLInputElement>) => void;
    valor: string;
}

const BarraPesquisa = ({
    aoLimpar,
    aoDigitar,
    aoPressionarEnter,
    valor
}: BarraPesquisaProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const aoClicarApagarBarraPesquisa = () => {
        aoLimpar();
        inputRef.current?.focus();
    };

    return (
        <S.Container>
            <label htmlFor="barra-pesquisa">{<Search size={28} />}</label>
            <input
                type="text"
                name="barra-pesquisa"
                id="barra-pesquisa"
                placeholder="Pesquisar..."
                value={valor}
                onChange={aoDigitar}
                onKeyDown={aoPressionarEnter}
                ref={inputRef}
            />
            {valor && <span onClick={aoClicarApagarBarraPesquisa}>{<X />}</span>}
        </S.Container>
    );
};

export default BarraPesquisa;
