import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    min-height: 100vh;
`;

export const ColunaDireita = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%; 
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
`;

export const AreaConteudo = styled.main`
    flex: 1;
    padding: 104px 32px 32px 32px; 

    @media (min-width: 950px) {
        padding: 32px;
    }
`;