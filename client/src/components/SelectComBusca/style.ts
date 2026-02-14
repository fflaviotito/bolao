import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const ListaErros = styled.ul`
    > li {
        list-style-position: inside;
        font-size: 10px;
        color: ${({ theme }) => theme.cores.erros};
    }
`;

export const ListaFlutuante = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    background: #fff;
    border: 1px solid #d1d5db;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 50;
    margin-top: 4px;

    li {
        padding: 10px 16px;
        cursor: pointer;
        font-size: 14px;
        color: #374151;
        transition: background 0.2s;

        &:hover {
            background-color: #f3f4f6;
            color: ${({ theme }) => theme.cores.hoverPrimario};
        }

        &.sem-resultados {
            color: #9ca3af;
            cursor: default;
            text-align: center;
            padding: 16px;
        }
    }
`;
