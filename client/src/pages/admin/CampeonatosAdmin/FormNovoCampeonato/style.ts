import styled from "styled-components";

export const Formulario = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const AcoesFormulario = styled.div`
    display: flex;
    flex-direction: column-reverse;
    gap: 12px;

    @media (min-width: 430px) {
        flex-direction: row;
        justify-content: right;
    }
`