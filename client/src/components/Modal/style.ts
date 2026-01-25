import styled from 'styled-components';

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    z-index: 9999;    
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Container = styled.div`
    background-color: #FFF;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    padding: 32px 20px;
    border-radius: 12px;
    box-shadow:
        0 8px 16px #0000001a,
        0 2px 4px #0000001a;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 24px;
`

export const Cabecalho = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-gap: 12px;
    align-items: start;

    > h2 {
        grid-column: 2;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: ${({ theme }) => theme.cores.textoPrimario};
        word-break: break-word;

        @media (min-width: 390px) {
            font-size: 24px;
        }
    }

    > button {
        grid-column: 3;
        justify-self: end;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        border: none;
        color: ${({ theme }) => theme.cores.textoTerciario};
        transition: color 0.2s;

        &:hover {
            color: ${({ theme }) => theme.cores.textoPrimario};
        }
    }
`

export const Conteudo = styled.div`
    overflow-y: auto;
    padding: 0 12px;
    
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 4px;

        &:hover {
            background: #94a3b8;
        }
    }
`;
