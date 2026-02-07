import z from 'zod';
import { anoRegra, dataBrasileiraRegra, divisaoRegra, nomePadraoRegra } from '@/validators';
import { transformarStringParaData, tratarErro, validarFormulario } from '@/utils';
import type { ModalFormularioProps } from '@/types/modal';
import { useCarregando } from '@/contexts/CarregandoContext';
import { useState, type FormEvent } from 'react';
import api from '@/services/api';
import { toast } from 'react-toastify';
import { Botao, InputTexto, Modal } from '@/components';
import * as S from '@/styles/FormsNovosCadastros';
import { mascaraAno, mascaraData, mascaraTextoPadrao } from '@/utils/mascaras';

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

const FormNovoCampeonato = ({ aberto, aoFechar, aoSucesso }: ModalFormularioProps) => {
    const { mostrarCarregando, esconderCarregando } = useCarregando();
    const [nome, setNome] = useState('');
    const [divisao, setDivisao] = useState('');
    const [ano, setAno] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [erros, setErros] = useState({});

    const aoEnviar = async (evento: FormEvent) => {
        evento.preventDefault();

        const dadosValidos = validarFormulario({
            schema,
            dados: { nome, divisao, ano, dataInicio, dataFim },
            setErros
        });

        if (!dadosValidos) return;

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
            aoSucesso();
        } catch (error) {
            tratarErro(error, setErros);
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
        setErros({});
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
