import styled from 'styled-components';

export const Cabecalho = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;

    > h1 {
        color: ${({ theme }) => theme.cores.textoPrimario};
        font-weight: bold;
        font-size: 32px;
    }
`;
