import type { ModalFormularioProps } from '@/types/modal';
import { useCarregando } from '@/contexts/CarregandoContext';
import { useEffect, useState, type FormEvent } from 'react';
import api from '@/services/api';
import { tratarErro } from '@/utils';
import { toast } from 'react-toastify';
import { Botao, InputTexto, Modal, SelectComBusca } from '@/components';
import * as S from '@/styles/FormsNovosCadastros';

interface Estadios {
    id: string;
    nomePopular: string;
}

const FormNovoTime = ({ aberto, aoFechar, aoSucesso }: ModalFormularioProps) => {
    const { mostrarCarregando, esconderCarregando } = useCarregando();
    const [nomeOficial, setNomeOficial] = useState('');
    const [nomePopular, setNomePopular] = useState('');
    const [sigla, setSigla] = useState('');
    const [escudo, setEscudo] = useState('');
    const [estadioId, setEstadioId] = useState('');
    const [erros, setErros] = useState({});
    const [opcoesEstadios, setOpcoesEstadios] = useState<{ label: string; value: string }[]>([]);
    const [carregandoEstadios, setCarregandoEstadios] = useState(false);

    useEffect(() => {
        if (aberto) {
            buscarEstadios();
        }
    }, [aberto]);

    const buscarEstadios = async () => {
        try {
            setCarregandoEstadios(true);

            const resposta = await api.get('/estadios', {
                params: { paginar: false }
            });

            const estadiosFormatados = resposta.data.map((estadio: Estadios) => ({
                label: estadio.nomePopular,
                value: estadio.id
            }));

            setOpcoesEstadios(estadiosFormatados);
        } catch (error) {
            tratarErro(error, setErros);
        } finally {
            setCarregandoEstadios(false);
        }
    };

    const aoEnviar = async (evento: FormEvent) => {
        evento.preventDefault();

        try {
            mostrarCarregando();

            await api.post('/admin/times', {
                nomeOficial,
                nomePopular,
                sigla,
                escudo,
                estadioId
            });

            toast.success('Time criado com sucesso');
            aoCancelar();
            aoSucesso();
        } catch (error) {
            tratarErro(error, setErros);
        } finally {
            esconderCarregando();
        }
    };

    const aoCancelar = () => {
        setNomeOficial('');
        setNomePopular('');
        setSigla('');
        setEscudo('');
        setEstadioId('');
        setErros({});
        aoFechar();
    };

    return (
        <Modal aberto={aberto} aoFechar={aoCancelar} titulo="Novo Time">
            <S.Formulario onSubmit={aoEnviar}>
                <InputTexto
                    label="Nome Oficial"
                    name="nomeOficial"
                    onChange={(evento) => setNomeOficial(evento.target.value)}
                    placeholder="Clube de Regatas do Flamengo"
                    value={nomeOficial}
                    erros={erros}
                    required={false}
                />
                <InputTexto
                    label="Nome Popular"
                    name="nomePopular"
                    onChange={(evento) => setNomePopular(evento.target.value)}
                    placeholder="Flamengo"
                    value={nomePopular}
                    erros={erros}
                    required={false}
                />
                <InputTexto
                    label="Sigla"
                    name="sigla"
                    onChange={(evento) => setSigla(evento.target.value)}
                    placeholder="FLA"
                    value={sigla}
                    erros={erros}
                    required={false}
                />
                <InputTexto
                    label="URL do escudo"
                    name="escudo"
                    onChange={(evento) => setEscudo(evento.target.value)}
                    placeholder="https://suaurl-escudo.jpg"
                    value={escudo}
                    erros={erros}
                    required={false}
                />
                <SelectComBusca
                    label="Estádio do time"
                    name="estadioId"
                    value={estadioId}
                    onChange={setEstadioId}
                    opcoes={opcoesEstadios}
                    erros={erros}
                    loading={carregandoEstadios}
                    placeholder="Pesquise o estádio..."
                />
                <S.AcoesFormulario>
                    <Botao
                        texto="Cancelar"
                        tipo="button"
                        variante="secundario"
                        aoClicar={aoCancelar}
                    />
                    <Botao texto="Salvar" tipo="submit" variante="primario" />
                </S.AcoesFormulario>
            </S.Formulario>
        </Modal>
    );
};

export default FormNovoTime;
