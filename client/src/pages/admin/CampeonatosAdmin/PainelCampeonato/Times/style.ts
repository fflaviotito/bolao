import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

export const Cabecalho = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    > h1 {
        font-size: 24px;
        font-weight: 700;
        color: ${({ theme }) => theme.cores.textoPrimario};
    }

    > p {
        font-size: 14px;
        color: ${({ theme }) => theme.cores.textoSecundario};
    }

    @media (min-width: 520px) {
        > h1 {
            font-size: 32px;
        }

        > p {
            font-size: 16px;
        }
    }
`;

export const Formulario = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;

    > div {
        max-width: 500px;
    }

    @media (min-width: 433px) {
        flex-direction: row;
        align-items: end;
    }
`;

export const ListaTimes = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    padding: 0;
`;

export const CardTime = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.cores.fundoCartao};
    border: 1px solid ${({ theme }) => theme.cores.bordaInput};
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-2px);
    }

    span {
        font-weight: 600;
        font-size: 16px;
        color: ${({ theme }) => theme.cores.textoPrimario};
    }
`;

export const BotaoRemover = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 6px;
    transition: all 0.2s;
    background-color: #fee2e2; 
    color: ${({ theme }) => theme.cores.erros};

    &:hover {
        background-color: ${({ theme }) => theme.cores.erros};
        color: #ffffff;
    }
`;