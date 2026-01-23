import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    width: 100%;
    max-width: 500px;

    > label {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        color: ${({ theme }) => theme.cores.textoTerciario};
        cursor: text;
        z-index: 1;
    }

    > input {
        width: 100%;
        height: 48px;
        padding-left: 48px;
        padding-right: 40px;
        color: ${({ theme }) => theme.cores.textoPrimario};
        background-color: ${({ theme }) => theme.cores.fundoInput};
        border: 1px solid ${({ theme }) => theme.cores.textoSecundario};
        border-radius: 8px;
        font-size: 16px;
        outline: none;
        transition: border-color 0.2s;

        &::placeholder {
            color: ${({ theme }) => theme.cores.textoTerciario};
        }
    }

    > span {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        color: ${({ theme }) => theme.cores.textoTerciario};
        cursor: pointer;
        z-index: 1;
    }
`;
