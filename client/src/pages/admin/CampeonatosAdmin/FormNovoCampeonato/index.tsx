import { useState } from 'react';
import InputTexto from '../../../../components/InputTexto';
import Modal from '../../../../components/Modal';
import * as S from './style';
import Botao from '../../../../components/Botao';

interface FormNovoCampeonatoProps {
    aberto: boolean;
    aoFechar: () => void;
}

const FormNovoCampeonato = ({ aberto, aoFechar }: FormNovoCampeonatoProps) => {
    const [nome, setNome] = useState('');
    const [divisao, setDivisao] = useState('');
    const [ano, setAno] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');

    return (
        <Modal aberto={aberto} aoFechar={aoFechar} titulo="Novo Campeonato">
            <S.Formulario>
                <InputTexto
                    label="Nome"
                    name="nome"
                    onChange={(evento) => setNome(evento.target.value)}
                    placeholder="Campeonato Brasileiro"
                    value={nome}
                    required={true}
                />
                <InputTexto
                    label="Divisão"
                    name="divisao"
                    onChange={(evento) => setDivisao(evento.target.value)}
                    placeholder="Série A"
                    value={divisao}
                    required={true}
                />
                <InputTexto
                    label="Ano"
                    name="ano"
                    onChange={(evento) => setAno(evento.target.value)}
                    placeholder={new Date().getFullYear().toString()}
                    value={ano}
                    required={true}
                />
                <InputTexto
                    label="Data de início"
                    name="dataInicio"
                    onChange={(evento) => setDataInicio(evento.target.value)}
                    placeholder={`11/02/${new Date().getFullYear()}`}
                    value={dataInicio}
                    required={true}
                />
                <InputTexto
                    label="Data de fim"
                    name="dataFim"
                    onChange={(evento) => setDataFim(evento.target.value)}
                    placeholder={`02/11/${new Date().getFullYear()}`}
                    value={dataFim}
                    required={true}
                />
                <S.AcoesFormulario>
                    <Botao
                        texto="Cancelar"
                        tipo="button"
                        variante="principal"
                        aoClicar={aoFechar}
                    />
                    <Botao
                        texto="Salvar"
                        tipo="submit"
                        variante="principal"
                        aoClicar={() => console.log('Salvando')}
                    />
                </S.AcoesFormulario>
            </S.Formulario>
        </Modal>
    );
};

export default FormNovoCampeonato;
