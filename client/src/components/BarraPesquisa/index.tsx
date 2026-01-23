import { useRef, type ChangeEvent } from 'react';
import * as S from './style';
import { Search, X } from 'lucide-react';

interface BarraPesquisaProps {
    aoClicarApagar: () => void;
    aoDigitar: (evento: ChangeEvent<HTMLInputElement>) => void;
    valor: string;
}

const BarraPesquisa = ({ aoClicarApagar, aoDigitar, valor }: BarraPesquisaProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const aoClicarApagarBarraPesquisa = () => {
        aoClicarApagar()
        inputRef.current?.focus();
    }

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
                ref={inputRef}
            />
            {valor && <span onClick={aoClicarApagarBarraPesquisa}>{<X />}</span>}
        </S.Container>
    );
};

export default BarraPesquisa;
