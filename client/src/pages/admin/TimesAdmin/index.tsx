import { useState } from 'react';
import { useBuscaPaginada } from '@/hooks/useBuscaPaginada';
import * as S from '@/styles/TabelasAdmin';
import PaginasAdmin from '@/layouts/PaginasAdmin';
import FormNovoTime from './FormNovoTime';

interface Times {
    escudo: string;
    estadio: { nomePopular: string };
    id: string;
    nomeOficial: string;
    nomePopular: string;
    sigla: string;
}

const TimesAdmin = () => {
    const [modalAberto, setModalAberto] = useState(false);
    const { busca, dados: times, paginacao, recarregar } = useBuscaPaginada<Times>('/times');

    return (
        <S.Container>
            <PaginasAdmin
                aoClicarAdicionar={() => setModalAberto(true)}
                barraPesquisa={busca}
                paginacao={paginacao}
                titulo="Times"
            >
                <S.TabelaContainer>
                    <S.Tabela>
                        <thead>
                            <tr>
                                <th style={{ width: '50px' }}>Nº</th>
                                <th>Nome Popular</th>
                                <th>Sigla</th>
                                <th>Nome Oficial</th>
                                <th>Estádio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {times.map((time, index) => (
                                <tr key={time.id}>
                                    <td>{(paginacao.pagina - 1) * 10 + index + 1}</td>
                                    <td>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px'
                                            }}
                                        >
                                            <img
                                                style={{
                                                    width: '30px',
                                                    objectFit: 'contain'
                                                }}
                                                src={time.escudo}
                                                alt={time.nomePopular}
                                            />
                                            <span style={{ fontWeight: 'bold', color: '#0f172a' }}>
                                                {time.nomePopular}
                                            </span>
                                        </div>
                                    </td>
                                    <td>{time.sigla}</td>
                                    <td>{time.nomeOficial}</td>
                                    <td>{time.estadio.nomePopular}</td>
                                </tr>
                            ))}
                        </tbody>
                    </S.Tabela>
                </S.TabelaContainer>
            </PaginasAdmin>
            <FormNovoTime
                aberto={modalAberto}
                aoFechar={() => setModalAberto(false)}
                aoSucesso={recarregar}
            />
        </S.Container>
    );
};

export default TimesAdmin;
