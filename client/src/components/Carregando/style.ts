import styled, { keyframes } from 'styled-components';

const desenharLinhaHorizontal = keyframes`
    0% { transform: scaleX(0); opacity: 0; }
    15% { transform: scaleX(1); opacity: 1; }
    85% { transform: scaleX(1); opacity: 1; } 
    92% { transform: scaleX(0); opacity: 0; } 
    100% { transform: scaleX(0); opacity: 0; }
`;

const aparecerPonto = keyframes`
    0% { transform: scale(0); }
    10% { transform: scale(0); }
    20% { transform: scale(1.5); }
    30% { transform: scale(1); opacity: 1; }
    85% { transform: scale(1); opacity: 1; }
    92% { transform: scale(0); opacity: 0; } 
    100% { transform: scale(0); opacity: 0; }
`;

const desenharCirculo = keyframes`
    0% { stroke-dashoffset: 160; opacity: 0; }
    15% { stroke-dashoffset: 160; opacity: 0; }
    20% { opacity: 1; }
    55% { stroke-dashoffset: 0; }
    65% { stroke-dashoffset: 0; opacity: 1; }
    85% { stroke-dashoffset: 160; opacity: 0; }
    100% { stroke-dashoffset: 160; opacity: 0; }
`;

export const OverlayContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(24, 24, 27, 0.95);
    z-index: 9999;
    backdrop-filter: blur(4px);
`;

export const Container = styled.div`
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SvgCampo = styled.svg`
    width: 100%;
    height: 100%;
    overflow: visible;
`;

export const LinhaMeio = styled.line`
    stroke: ${({ theme }) => theme.cores.primario};
    stroke-width: 4;
    stroke-linecap: round;
    transform-origin: center;
    animation: ${desenharLinhaHorizontal} 3.5s ease-in-out infinite;
`;

export const PontoCentral = styled.circle`
    fill: ${({ theme }) => theme.cores.primario};
    transform-origin: center;
    animation: ${aparecerPonto} 3.5s ease-in-out infinite;
`;

export const CirculoMeio = styled.circle`
    fill: none;
    stroke: ${({ theme }) => theme.cores.primario};
    stroke-width: 3;
    stroke-linecap: round;
    stroke-dasharray: 160;
    stroke-dashoffset: 160;
    transform-origin: center;
    animation: ${desenharCirculo} 3.5s ease-in-out infinite;
`;