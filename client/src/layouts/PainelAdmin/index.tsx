import { Outlet } from 'react-router-dom';
import MenuNavegacaoAdmin from '../../components/MenuNavegacaoAdmin';
import * as S from './style';
import Rodape from '../../components/Rodape';

const PainelAdmin = () => {
    return (
        <S.Container>
            <MenuNavegacaoAdmin />
            <S.ColunaDireita>
                <S.AreaConteudo>
                    <Outlet />
                </S.AreaConteudo>
                <Rodape />
            </S.ColunaDireita>
        </S.Container>
    );
};

export default PainelAdmin;
