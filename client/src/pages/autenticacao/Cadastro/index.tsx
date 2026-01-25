import { useEffect, useState, type FormEvent } from 'react';
import Botao from '../../../components/Botao';
import InputTexto from '../../../components/InputTexto';
import {
    CabecalhoCartao,
    CartaoCadastro,
    FormularioCadastro,
    LadoMarca,
    CadastroContainer,
    RodapeCartao
} from './style';
import z from 'zod';
import { emailRegra, nomeUsuarioRegra, senhaForteRegra } from '../../../validators/regras';
import { toast } from 'react-toastify';
import { useCarregando } from '../../../contexts/CarregandoContext';
import type { AxiosError } from 'axios';
import type { RespostaErro } from '../../../types/api';
import api from '../../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { formatarErrosZod } from '../../../utils/formatarErrosZod';

const cadastroSchema = z
    .object({
        nome: nomeUsuarioRegra,
        email: emailRegra,
        senha: senhaForteRegra,
        senhaConfirmacao: z.string()
    })
    .refine((dados) => dados.senha === dados.senhaConfirmacao, {
        message: 'As senhas não coincidem',
        path: ['senhaConfirmacao']
    });

const Cadastro = () => {
    const navegar = useNavigate();

    const { mostrarCarregando, esconderCarregando } = useCarregando();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
    const [erros, setErros] = useState({});

    useEffect(() => {
        document.title = 'Bolão | Crie sua conta';
    }, []);

    const aoEnviar = async (evento: FormEvent) => {
        evento.preventDefault();
        setErros({});

        const dadosValidos = cadastroSchema.safeParse({ nome, email, senha, senhaConfirmacao });
        if (!dadosValidos.success) {
            const errosFormatados = formatarErrosZod(dadosValidos.error);
            setErros(errosFormatados);
            return toast.warning('Verifique os campos destacados!');
        }

        try {
            mostrarCarregando();
            await api.post('/registrar', dadosValidos.data);
            toast.success('Cadastro realizado com sucesso!');
            navegar('/entrar');
        } catch (error) {
            const erroAxios = error as AxiosError<RespostaErro>;

            if (!erroAxios.response) {
                return toast.error('Erro de conexão com o servidor. Tente mais tarde!');
            }

            const { codigo } = erroAxios.response.data;

            if (codigo === 400) return toast.warning('Campos inválidos!');

            if (codigo === 409) {
                setErros({ email: ['E-mail já está em uso'] });
                return toast.warning('E-mail já cadastrado!');
            }

            if (codigo === 500) return toast.error('Erro no servidor, contate o suporte!');
        } finally {
            esconderCarregando();
        }
    };

    return (
        <CadastroContainer>
            <LadoMarca>
                <img src="/images/logo.png" alt="Logo do Bolão" />
                <div>
                    <h1>Junte-se à torcida!</h1>
                    <p>
                        Crie sua conta em segundos.
                        <br />
                        Começe a palpitar nos melhores jogos.
                    </p>
                </div>
            </LadoMarca>

            <CartaoCadastro>
                <CabecalhoCartao>
                    <img src="/images/logo.png" alt="Logo do Bolão" />
                    <h2>Crie sua conta</h2>
                    <p>Insira suas informações e faça seu registro</p>
                </CabecalhoCartao>

                <FormularioCadastro onSubmit={aoEnviar}>
                    <div>
                        <InputTexto
                            label="Nome"
                            placeholder="Digite seu nome..."
                            required={false}
                            name="nome"
                            value={nome}
                            onChange={(evento) => setNome(evento.target.value)}
                            erros={erros}
                        />
                        <InputTexto
                            label="E-mail"
                            type="text"
                            placeholder="Digite seu email..."
                            required={false}
                            name="email"
                            value={email}
                            onChange={(evento) => setEmail(evento.target.value)}
                            erros={erros}
                        />
                        <InputTexto
                            label="Senha"
                            type="password"
                            placeholder="Digite sua senha..."
                            required={false}
                            name="senha"
                            value={senha}
                            onChange={(evento) => setSenha(evento.target.value)}
                            erros={erros}
                        />
                        <InputTexto
                            label="Confirme sua senha"
                            type="password"
                            placeholder="Digite novamente sua senha..."
                            required={false}
                            name="senhaConfirmacao"
                            value={senhaConfirmacao}
                            onChange={(evento) => setSenhaConfirmacao(evento.target.value)}
                            erros={erros}
                        />
                    </div>
                    <Botao tipo="submit" texto="Cadastre-se" variante="principal" larguraTotal />
                </FormularioCadastro>

                <RodapeCartao>
                    <Link to="/entrar">
                        Já tem uma conta? <span>Entrar</span>
                    </Link>
                </RodapeCartao>
            </CartaoCadastro>
        </CadastroContainer>
    );
};

export default Cadastro;
