import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    :root {
        /* --- Cores Personalizadas do Toastify --- */
        --toastify-color-error: ${({ theme }) => theme.cores.erros};
        --toastify-color-success: ${({ theme }) => theme.cores.primario};
        --toastify-font-family: ${({ theme }) => theme.fonte.primario};
        --toastify-text-color-light: ${({ theme }) => theme.cores.textoPrimario};
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: ${({ theme }) => theme.cores.fundoSite};
        font-family: ${({ theme }) => theme.fonte.primario};
    }

    button {
        cursor: pointer;
        border: none;
    }

    a {
        text-decoration: none;
    }
`;
