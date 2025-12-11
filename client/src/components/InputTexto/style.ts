import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;

    > label {
        height: 20px;
        font-size: 16px;
        color: ${({ theme }) => theme.cores.textoSecundario};
    }

    > input {
        height: 48px;
        padding: 0 16px;
        background-color: ${({ theme }) => theme.cores.fundoInput};
        border: 1px solid ${({ theme }) => theme.cores.bordaInput};
        border-radius: 8px;
        font-size: 14px;
        color: ${({ theme }) => theme.cores.textoPrimario};

        &::placeholder {
            color: ${({ theme }) => theme.cores.textoTerciario};
        }

        &:focus {
            outline-color: ${({ theme }) => theme.cores.hoverPrimario};
        }
    }
`;
