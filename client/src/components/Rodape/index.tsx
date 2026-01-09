import * as S from './style';

const Rodape = () => {
    return (
        <S.Container>
            <p>&copy; {new Date().getFullYear()} Bolão Admin. Todos os direitos reservados.</p>
            <p>
                Feito por{' '}
                <a href="https://github.com/fflaviotito" target="_blank">
                    Francisco Flávio
                </a>
            </p>
        </S.Container>
    );
};

export default Rodape;
