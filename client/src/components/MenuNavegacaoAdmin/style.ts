import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.aside`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 300px;
    box-shadow:
        0 8px 16px #0000001a,
        0 2px 4px #0000001a;
`;

export const CabecalhoMenu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    padding: 16px;

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
    height: 40px;
    padding-left: 12px;
    margin: 0 20px;
    color: ${({ theme }) => theme.cores.textoSecundario};
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover,
    &.active {
        background-color: #FFF;
        color: ${({ theme }) => theme.cores.textoPrimario};
        font-weight: bold;
        border: 1px solid ${({ theme }) => theme.cores.bordaInput};;
    }
`;

export const LinkVoltar = styled(Link)`
    display: flex;
    align-items: center;
    gap: 12px;
    height: 44px;
    padding-left: 32px;
    color: ${({ theme }) => theme.cores.textoSecundario};
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: ${({ theme }) => theme.cores.hoverPrimario};
        color: #FFF;
        font-weight: bold;
    }
`;
