import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

// 1. NOVO: O Cabeçalho Fixo do Mobile (App Bar)
// 1. O Cabeçalho (Limpo e usando Grid puro)
export const CabecalhoCelular = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 64px;
    background-color: #fff;
    padding: 12px 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    z-index: 40;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;

    @media (min-width: 950px) {
        display: none;
    }

    > img {
        grid-column: 2;
        justify-self: center;
        max-height: 48px;
        width: 100%;
    }

    > button {
        grid-column: 1;
        justify-self: start;
        background: transparent;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${({ theme }) => theme.cores.textoPrimario};
    }
`;

export const Overlay = styled.div<{ $aberto: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 45;
    display: ${({ $aberto }) => ($aberto ? 'block' : 'none')};
    transition: all 0.3s;

    @media (min-width: 950px) {
        display: none;
    }
`;

export const Container = styled.aside<{ $aberto: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px;
    background-color: #fff;
    z-index: 50;
    box-shadow: 4px 0 16px rgba(0, 0, 0, 0.1);
    transform: ${({ $aberto }) => ($aberto ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.3s ease-in-out;
    display: flex;
    flex-direction: column;

    @media (min-width: 950px) {
        position: static;
        width: 300px;
        transform: none;
        box-shadow:
            0 8px 16px #0000001a,
            0 2px 4px #0000001a;
        z-index: 1;
    }
`;

export const CabecalhoMenu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    padding: 16px;

    > div {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        width: 100%;

        > img {
            width: 100%;
            height: auto;
            object-fit: contain;
            justify-self: center;
        }

        > button {
            width: auto;
            height: 40px;
            width: 40px;
            background: transparent;
            color: ${({ theme }) => theme.cores.textoSecundario};
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;

            &:hover {
                background-color: #f1f5f9;
            }

            @media (min-width: 950px) {
                display: none;
            }
        }
    }

    > p {
        text-align: center;
        color: ${({ theme }) => theme.cores.textoTerciario};
        font-size: 14px;
    }
`;

export const Menu = styled.nav`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const ListaLinks = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 4px;
    list-style: none;
`;

export const ItemLink = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 12px;
    height: 48px;
    padding-left: 12px;
    margin: 0 20px;
    color: ${({ theme }) => theme.cores.textoSecundario};
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;

    &:hover,
    &.active {
        background-color: #fff;
        color: ${({ theme }) => theme.cores.textoPrimario};
        font-weight: bold;
        border: 1px solid ${({ theme }) => theme.cores.bordaInput};
    }
`;

export const LinkVoltar = styled(Link)`
    display: flex;
    align-items: center;
    gap: 12px;
    height: 56px;
    padding-left: 32px;
    color: ${({ theme }) => theme.cores.textoSecundario};
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    border-top: 1px solid #f1f5f9;

    &:hover {
        background-color: ${({ theme }) => theme.cores.hoverPrimario};
        color: #fff;
        font-weight: bold;
    }
`;
