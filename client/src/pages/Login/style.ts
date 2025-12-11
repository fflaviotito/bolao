import { styled } from 'styled-components';

export const LoginContainer = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    padding: 20px;

    @media (min-width: 744px) {
        flex-direction: column;
        gap: 32px;
        padding-left: 32px;
        padding-right: 32px;
    }

    @media (min-width: 1024px) {
        flex-direction: row;
        max-width: 1264px;
        margin: auto;
        padding-top: 0;
        padding-bottom: 0;
    }
`;

export const LadoMarca = styled.header`
    display: none;

    @media (min-width: 744px) {
        display: flex;
        flex-direction: column;

        > img {
            width: 280px;
            height: 80px;
            margin: auto;
        }

        > div {
            display: none;
        }
    }

    @media (min-width: 1024px) {
        width: 100%;
        gap: 80px;

        > img {
            margin: 0;
            width: 400px;
            height: 120px;
        }

        > div {
            display: flex;
            flex-direction: column;
            gap: 16px;

            > h1 {
                font-size: 48px;
                font-weight: bold;
                text-align: left;
            }

            > p {
                text-align: left;
            }

            > p:first-of-type {
                font-size: 20px;
                color: ${({ theme }) => theme.cores.textoPrimario};
            }
        }
    }
`;

export const CartaoLogin = styled.section`
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    max-width: 520px;
    padding: 32px 20px;
    background-color: ${({ theme }) => theme.cores.fundoCartao};
    border-radius: 16px;
    box-shadow:
        0 8px 16px #0000001a,
        0 2px 4px #0000001a;

    @media (min-width: 1024px) {
        min-width: 520px;
        max-width: 570px;
    }
`;

export const CabecalhoCartao = styled.header`
    display: flex;
    flex-direction: column;
    gap: 16px;

    > img {
        margin: auto;
        width: 100%;
        max-width: 200px;
        height: 58px;
    }

    > h2 {
        display: none;
    }

    p {
        margin: 0;
        text-align: center;
        font-size: 14px;
        color: ${({ theme }) => theme.cores.textoSecundario};
    }

    @media (min-width: 744px) {
        > img {
            display: none;
        }

        > h2 {
            display: block;
            font-size: 40px;
            font-weight: 600;
            text-align: center;
            color: ${({ theme }) => theme.cores.textoPrimario};
        }
    }
`;

export const FormularioLogin = styled.form`
    display: flex;
    flex-direction: column;
    gap: 32px;

    > div {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    div.checkbox {
        display: flex;
        gap: 8px;

        > input {
            height: 20px;
            width: 20px;
            border-radius: 4px;
            accent-color: ${({ theme }) => theme.cores.secundario};
        }

        > label {
            font-size: 16px;
            color: ${({ theme }) => theme.cores.textoSecundario};
        }
    }
`;

export const RodapeCartao = styled.footer`
    display: flex;
    flex-direction: column;

    > a {
        text-align: center;
        text-decoration: none;
        font-size: 14px;
        padding: 8px 0;
        color: ${({ theme }) => theme.cores.textoSecundario};

        > span {
            font-weight: bold;
            color: ${({ theme }) => theme.cores.primario};
        }
    }

    @media (min-width: 1024px) {
        > a {
            width: fit-content;
            margin: auto;
            padding: 8px;
        }

        > a:first-of-type:hover {
            text-decoration: underline;
            color: ${({ theme }) => theme.cores.textoPrimario};
        }

        > a:last-of-type:hover {
            color: ${({ theme }) => theme.cores.textoPrimario};

            > span {
                text-decoration: underline;
                color: ${({ theme }) => theme.cores.hoverPrimario};
            }
        }
    }
`;
