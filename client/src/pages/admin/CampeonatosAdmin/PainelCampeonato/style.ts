import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 1200px;
    margin: auto;

    > h2 {
        font-size: 18px;
        font-weight: 600;
        color: ${({ theme }) => theme.cores.textoSecundario};
        margin: 0;
        margin-bottom: -12px;

        @media (min-width: 520px) {
            font-size: 20px;
        }
    }
`;

export const Cabecalho = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    > h1 {
        font-size: 24px;
        font-weight: 700;
        color: ${({ theme }) => theme.cores.textoPrimario};
    }

    > p {
        font-size: 14px;
        font-weight: 600;
        background-color: ${({ theme }) => theme.cores.primario}1A;
        color: ${({ theme }) => theme.cores.primario};
        width: fit-content;
        padding: 4px 12px;
        border-radius: 16px;
    }

    @media (min-width: 520px) {
        > h1 {
            font-size: 32px;
        }

        > p {
            font-size: 16px;
        }
    }
`;

export const GridBotoes = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;
    gap: 16px;
    align-items: stretch;

    @media (min-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1070px) or ((min-width: 800px) and (max-width: 949px)) {
        grid-template-columns: repeat(4, 1fr);
    }
`;
