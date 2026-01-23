import styled, { css } from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 1264px;
    margin: auto;
    padding: 32px;
`;

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

export const TabelaContainer = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.cores.fundoCartao};
    border-radius: 8px;
    box-shadow:
        0 8px 16px #0000001a,
        0 2px 4px #0000001a;
    border: ${({ theme }) => theme.cores.bordaInput};
    overflow: hidden;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
        height: 8px;
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

export const Tabela = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;

    > thead {
        background-color: #f8fafc;

        > tr > th {
            padding: 16px 24px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: ${({ theme }) => theme.cores.textoSecundario};
            border-bottom: 1px solid #e2e8f0;
            white-space: nowrap;
        }
    }

    > tbody {
        > tr {
            border-bottom: 1px solid #f1f5f9;
            transition: all 0.2s;
            cursor: pointer;

            &:hover {
                background-color: #f8fafc;
            }

            &:last-child {
                border-bottom: none;
            }

            > td {
                padding: 16px 24px;
                color: ${({ theme }) => theme.cores.textoPrimario};
                font-size: 14px;
                font-weight: 500;
            }
        }
    }
`;

export const PilulaStatus = styled.span<{ $tipo: 'ativo' | 'finalizado' }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 12px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;

    ${({ $tipo }) => {
        switch ($tipo) {
            case 'ativo':
                return css`
                    background-color: ${({ theme }) => theme.cores.secundario};
                    color: ${({ theme }) => theme.cores.textoPrimario};
                `;
            case 'finalizado':
            default:
                return css`
                    background-color: ${({ theme }) => theme.cores.fundoSite};
                    color: ${({ theme }) => theme.cores.textoPrimario};
                `;
        }
    }}
`;