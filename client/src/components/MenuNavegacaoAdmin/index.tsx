import { useState } from 'react';
import * as S from './style';
import { ArrowLeft, Flag, Home, Shield, Trophy, User, Menu, X } from 'lucide-react';

// ... opcoesMenu ...
const opcoesMenu = [
    { texto: 'Início', icone: <Home size={20} />, caminho: '/admin', end: true },
    { texto: 'Campeonatos', icone: <Trophy size={20} />, caminho: '/admin/campeonatos' },
    { texto: 'Estádios', icone: <Flag size={20} />, caminho: '/admin/estadios' },
    { texto: 'Times', icone: <Shield size={20} />, caminho: '/admin/times' },
    { texto: 'Usuários', icone: <User size={20} />, caminho: '/admin/usuarios' }
];

const MenuNavegacaoAdmin = () => {
    const [menuAberto, setMenuAberto] = useState(false);

    const toggleMenu = () => setMenuAberto(!menuAberto);
    const fecharMenu = () => setMenuAberto(false);

    return (
        <>
            <S.CabecalhoCelular>
                <button onClick={toggleMenu} type="button">
                    <Menu size={28} />
                </button>
                <img src="/images/logo.png" alt="Logo" />
            </S.CabecalhoCelular>

            <S.Overlay $aberto={menuAberto} onClick={fecharMenu} />

            <S.Container $aberto={menuAberto}>
                <S.CabecalhoMenu>
                    <div className="topo-mobile">
                        {/* Logo também aparece dentro do menu quando aberto */}
                        <img src="/images/logo.png" alt="Logo" />

                        <button type="button" onClick={fecharMenu}>
                            <X size={24} />
                        </button>
                    </div>
                    <p>Menu Administrador</p>
                </S.CabecalhoMenu>

                <S.Menu>
                    <S.ListaLinks>
                        {opcoesMenu.map((opcao) => (
                            <li key={opcao.texto}>
                                <S.ItemLink to={opcao.caminho} end={opcao.end} onClick={fecharMenu}>
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
        </>
    );
};

export default MenuNavegacaoAdmin;
