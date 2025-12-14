import styled from 'styled-components';

interface ContainerProps {
    $temErro?: boolean;
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;

    > label {
        height: 20px;
        font-size: 16px;
        color: ${({ theme, $temErro }) =>
            $temErro ? theme.cores.erros : theme.cores.textoSecundario};
    }

    > input {
        height: 48px;
        padding: 0 16px;
        background-color: ${({ theme }) => theme.cores.fundoInput};
        border: 1px solid ${({ theme, $temErro }) => $temErro ? theme.cores.erros : theme.cores.textoSecundario};
        border-radius: 8px;
        font-size: 14px;
        color: ${({ theme }) => theme.cores.textoPrimario};

        &::placeholder {
            color: ${({ theme }) => theme.cores.textoTerciario};
        }

        &:focus {
            outline-color: ${({ theme, $temErro }) =>
                $temErro ? theme.cores.erros : theme.cores.textoSecundario};
        }
    }
`;

export const ListaErros = styled.ul`
    > li {
        list-style-position: inside;
        font-size: 10px;
        color: ${({ theme }) => theme.cores.erros};
    }
`;
