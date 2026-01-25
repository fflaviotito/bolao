import styled from 'styled-components';

export const Cabecalho = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    text-align: center;

    > h1 {
        color: ${({ theme }) => theme.cores.textoPrimario};
        font-weight: bold;
        font-size: 24px;
    }

    @media (min-width: 334px) {
        flex-direction: row;
        align-items: center;
    }

    @media (min-width: 404px) {
        > h1 {
            font-size: 32px;
        }
    }
`;
