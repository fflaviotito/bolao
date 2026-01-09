import * as S from './style';
import { ArrowLeft, Flag, Home, Shield, Trophy, User } from 'lucide-react';

const opcoesMenu = [
    { texto: 'Início', icone: <Home size={20} />, caminho: '/admin', end: true },
    { texto: 'Campeonatos', icone: <Trophy size={20} />, caminho: '/admin/campeonatos' },
    { texto: 'Estádios', icone: <Flag size={20} />, caminho: '/admin/estadios' },
    { texto: 'Times', icone: <Shield size={20} />, caminho: '/admin/times' },
    { texto: 'Usuários', icone: <User size={20} />, caminho: '/admin/usuarios' }
];

const MenuNavegacaoAdmin = () => {
    return (
        <S.Container>
            <S.CabecalhoMenu>
                <img src="images/logo.png" alt="Logo do site" />
                <p>Menu Administrador!</p>
            </S.CabecalhoMenu>
            <S.Menu>
                <S.ListaLinks>
                    {opcoesMenu.map((opcao) => (
                        <li key={opcao.texto}>
                            <S.ItemLink to={opcao.caminho} end={opcao.end}>
                                {opcao.icone}
                                {opcao.texto}
                            </S.ItemLink>
                        </li>
                    ))}
                </S.ListaLinks>
                <S.ListaLinks>
                    <li>
                        <S.LinkVoltar to="/">
                            <ArrowLeft size={20} />
                            Voltar ao Site
                        </S.LinkVoltar>
                    </li>
                </S.ListaLinks>
            </S.Menu>
        </S.Container>
    );
};

export default MenuNavegacaoAdmin;
