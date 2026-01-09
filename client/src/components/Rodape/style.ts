import styled from 'styled-components';

export const Container = styled.footer`
    width: 100%;
    padding: 12px;
    text-align: center;
    color: ${({ theme }) => theme.cores.textoSecundario};
    font-size: 14px;
    border-top: 1px solid #e2e8f0;
    margin-top: auto;

    a {
        color: unset;
        font-weight: bold;

        &:hover {
            color: ${({ theme }) => theme.cores.primario};
        }
    }
`;
