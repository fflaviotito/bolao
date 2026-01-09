import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
`;

export const ColunaDireita = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 100vh;
    overflow-y: auto;
    scroll-behavior: smooth;
`;

export const AreaConteudo = styled.main`
    flex: 1;
`;
