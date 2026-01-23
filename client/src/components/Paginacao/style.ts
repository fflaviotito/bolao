import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;

    @media (min-width: 640px) {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
    }
`;

export const Info = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.cores.textoTerciario};
    text-align: center;
    width: 100%;

    @media (min-width: 640px) {
        text-align: left;
        justify-self: start;
        width: auto;
    }
`;

export const Controles = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;

    > button {
        border: none;
        background-color: transparent;
        color: ${({ theme }) => theme.cores.textoSecundario};
        font-weight: bold;
        font-size: 14px;

        &:hover {
            color: ${({ theme }) => theme.cores.textoPrimario};
            text-decoration: underline;
        }

        &:disabled {
            color: ${({ theme }) => theme.cores.textoTerciario};
            cursor: not-allowed;

            &:hover {
                text-decoration: none;
            }
        }
    }

    > span {
        color: ${({ theme }) => theme.cores.textoSecundario};
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        min-width: 60px;
    }

    @media (min-width: 640px) {
        width: auto;
        justify-self: center;
    }
`;
