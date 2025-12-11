import styled, { css } from 'styled-components';

interface BotaoEstilizadoProps {
    $variante: string;
}

export const BotaoEstilizado = styled.button<BotaoEstilizadoProps>`
    width: 100%;
    border: none;

    ${({ $variante, theme }) =>
        $variante === 'principal' && css`
            height: 48px;
            background-color: ${theme.cores.primario};
            border-radius: 100px;
            color: #fff;
            font-size: 20px;
            font-weight: bold;

            &:hover {
                background-color: ${theme.cores.hoverPrimario};
            }
        `}
`;
