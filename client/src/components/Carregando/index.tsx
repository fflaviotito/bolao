import { CirculoMeio, Container, LinhaMeio, OverlayContainer, PontoCentral, SvgCampo } from "./style";


const Carregando = () => {
    return (
        <OverlayContainer>
            <Container>
                <SvgCampo viewBox="0 0 100 100">
                    <LinhaMeio x1="10" y1="50" x2="90" y2="50" />
                    <CirculoMeio cx="50" cy="50" r="25" />
                    <PontoCentral cx="50" cy="50" r="4" />
                </SvgCampo>
            </Container>
        </OverlayContainer>
    );
};

export default Carregando;
