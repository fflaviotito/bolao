import styled, { css } from 'styled-components';

interface BotaoEstilizadoProps {
    $variante: string;
    $larguraTotal: boolean;
}

export const BotaoEstilizado = styled.button<BotaoEstilizadoProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: ${({ $larguraTotal }) => ($larguraTotal ? '100%' : 'auto')};
    background-color: ${({ theme }) => theme.cores.primario};
    color: #fff;
    padding: 0 12px;
    height: 48px;
    font-size: 20px;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${({ theme }) => theme.cores.hoverPrimario};
    }

    ${({ $variante }) =>
        $variante === 'principal' &&
        css`
            border-radius: 100px;
        `}

    ${({ $variante }) =>
        $variante === 'primario' &&
        css`
            border-radius: 16px;
        `}

    ${({ $variante }) =>
        $variante === 'secundario' &&
        css`
            background-color: ${({ theme }) => theme.cores.textoTerciario};
            border-radius: 16px;

            &:hover {
                background-color: ${({ theme }) => theme.cores.textoSecundario};
            }
        `}
`;
