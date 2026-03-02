import styled from 'styled-components';

export const BotaoCard = styled.button`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.cores.fundoCartao};
    border-radius: 8px;
    border: 1px solid transparent;
    box-shadow:
        0 8px 16px #0000001a,
        0 2px 4px #0000001a;
    padding: 24px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 12px;
    transition: all 0.2s;

    &:hover {
        border-color: ${({ theme }) => theme.cores.primario};
        transform: translateY(-2px);
    }

    > svg {
        width: 32px;
        height: 32px;
        color: ${({ theme }) => theme.cores.primario};
        flex-shrink: 0;
    }
`;

export const AreaTexto = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    > span:first-of-type {
        font-weight: 600;
        font-size: 18px;
        color: ${({ theme }) => theme.cores.textoPrimario};
        line-height: 1.2;
    }

    > span:last-of-type {
        font-size: 16px;
        color: ${({ theme }) => theme.cores.textoSecundario};
        line-height: 1.4;
    }
`;
