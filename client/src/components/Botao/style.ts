import styled, { css } from 'styled-components';

interface BotaoEstilizadoProps {
    $variante: string;
}

export const BotaoEstilizado = styled.button<BotaoEstilizadoProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    height: 48px;
    border: none;
    color: #fff;
    font-size: 20px;
    font-weight: bold;

    ${({ $variante, theme }) =>
        $variante === 'principal' && css`
            background-color: ${theme.cores.primario};
            border-radius: 100px;

            &:hover {
                background-color: ${theme.cores.hoverPrimario};
            }
        `}
    
    ${({ $variante, theme }) =>
        $variante === 'adicionar' && css`
            background-color: ${theme.cores.primario};
            border-radius: 16px;
            padding: 0 12px;

            &:hover {
                background-color: ${theme.cores.hoverPrimario};
            }
        `}
`;
