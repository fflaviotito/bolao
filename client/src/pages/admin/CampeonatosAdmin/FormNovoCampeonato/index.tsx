import { useState, type FormEvent } from 'react';
import InputTexto from '../../../../components/InputTexto';
import Modal from '../../../../components/Modal';
import * as S from './style';
import Botao from '../../../../components/Botao';
import z from 'zod';
import {
    anoRegra,
    dataBrasileiraRegra,
    divisaoRegra,
    nomePadraoRegra
} from '../../../../validators/regras';
import { formatarErrosZod } from '../../../../utils/formatarErrosZod';
import { toast } from 'react-toastify';
import { useCarregando } from '../../../../contexts/CarregandoContext';
import type { AxiosError } from 'axios';
import type { RespostaErro } from '../../../../types/api';
import { transformarStringParaData } from '../../../../utils/transformarStringParaData';
import { mascaraAno, mascaraData, mascaraTextoPadrao } from '../../../../utils/mascaras';
import api from '../../../../services/api';

interface FormNovoCampeonatoProps {
    aberto: boolean;
    aoCriar: () => void;
    aoFechar: () => void;
}

const schema = z
    .object({
        nome: nomePadraoRegra,
        divisao: divisaoRegra,
        ano: anoRegra,
        dataInicio: dataBrasileiraRegra,
        dataFim: dataBrasileiraRegra
    })
    .refine(
        (dados) => {
            if (dados.dataInicio.length === 10 && dados.dataFim.length === 10) {
                const dataInicioFormatado = transformarStringParaData(dados.dataInicio);
                const dataFimFormatado = transformarStringParaData(dados.dataFim);

                return dataFimFormatado > dataInicioFormatado;
            }
            return true;
        },
        {
            message: 'A data final deve ser posterior à inicial',
            path: ['dataFim']
        }
    );

const FormNovoCampeonato = ({ aberto, aoCriar, aoFechar }: FormNovoCampeonatoProps) => {
    const { mostrarCarregando, esconderCarregando } = useCarregando();
    const [nome, setNome] = useState('');
    const [divisao, setDivisao] = useState('');
    const [ano, setAno] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [erros, setErros] = useState({});

    const aoEnviar = async (evento: FormEvent) => {
        evento.preventDefault();
        setErros({});

        const dadosValidos = schema.safeParse({ nome, divisao, ano, dataInicio, dataFim });
        if (!dadosValidos.success) {
            const errosFormatados = formatarErrosZod(dadosValidos.error);
            setErros(errosFormatados);
            return toast.warning('Verifique os campos destacados!');
        }

        try {
            mostrarCarregando();

            await api.post('/admin/campeonatos', {
                nome,
                divisao,
                ano,
                dataInicio,
                dataFim
            });

            toast.success('Campeonato criado com sucesso!');
            aoCancelar();
            aoCriar();
        } catch (error) {
            const erroAxios = error as AxiosError<RespostaErro>;

            if (!erroAxios.response) {
                return toast.error('Erro de conexão com o servidor. Tente mais tarde!');
            }

            const { codigo } = erroAxios.response.data;

            if (codigo === 400) return toast.warning('Campos inválidos!');

            if (codigo === 401) return toast.warning('Entre em sua conta novamente!');

            if (codigo === 403) return toast.error('Acesso negado!');

            if (codigo === 409) return toast.error('Já existe um campeonato com este nome, divisão e ano!');

            if (codigo === 500) return toast.error('Erro no servidor, contate o suporte!');
        } finally {
            esconderCarregando();
        }
    };

    const aoCancelar = () => {
        setNome('');
        setDivisao('');
        setAno('');
        setDataInicio('');
        setDataFim('');
        setErros({})
        aoFechar();
    };

    return (
        <Modal aberto={aberto} aoFechar={aoCancelar} titulo="Novo Campeonato">
            <S.Formulario onSubmit={aoEnviar}>
                <InputTexto
                    label="Nome"
                    name="nome"
                    onChange={(evento) => setNome(mascaraTextoPadrao(evento.target.value))}
                    placeholder="Campeonato Brasileiro"
                    value={nome}
                    required={false}
                    erros={erros}
                />
                <InputTexto
                    label="Divisão"
                    name="divisao"
                    onChange={(evento) => setDivisao(mascaraTextoPadrao(evento.target.value))}
                    placeholder="Série A"
                    value={divisao}
                    required={false}
                    erros={erros}
                />
                <InputTexto
                    label="Ano"
                    name="ano"
                    onChange={(evento) => setAno(mascaraAno(evento.target.value))}
                    placeholder={new Date().getFullYear().toString()}
                    value={ano}
                    required={false}
                    erros={erros}
                />
                <InputTexto
                    label="Data de início"
                    name="dataInicio"
                    onChange={(evento) => setDataInicio(mascaraData(evento.target.value))}
                    placeholder={`11/02/${new Date().getFullYear()}`}
                    value={dataInicio}
                    required={false}
                    erros={erros}
                />
                <InputTexto
                    label="Data de fim"
                    name="dataFim"
                    onChange={(evento) => setDataFim(mascaraData(evento.target.value))}
                    placeholder={`02/11/${new Date().getFullYear()}`}
                    value={dataFim}
                    required={false}
                    erros={erros}
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

export default FormNovoCampeonato;
