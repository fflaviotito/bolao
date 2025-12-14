import { useEffect, useState, type FormEvent } from 'react';
import Botao from '../../components/Botao';
import InputTexto from '../../components/InputTexto';
import {
    CabecalhoCartao,
    CartaoLogin,
    FormularioLogin,
    LadoMarca,
    LoginContainer,
    RodapeCartao
} from './style';
import api from '../../services/api';
import type { LoginResponse } from '../../types/auth';
import type { AxiosError } from 'axios';
import type { RespostaErro } from '../../types/api';
import { useNavigate, Link } from 'react-router-dom';
import z from 'zod';
import { emailRegra, senhaPuraLogin } from '../../validators/regras';
import { toast } from 'react-toastify';
import { useCarregando } from '../../contexts/CarregandoContext';

const loginSchema = z.object({
    email: emailRegra,
    senha: senhaPuraLogin
});

const Login = () => {
    const navegar = useNavigate();

    const { mostrarCarregando, esconderCarregando } = useCarregando();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        document.title = 'Bolão | Acesse sua conta';

        const token = localStorage.getItem('bolao:token');
        if (token) navegar('/', { replace: true });
    }, [navegar]);

    const aoEnviar = async (evento: FormEvent) => {
        evento.preventDefault();

        const dadosValidos = loginSchema.safeParse({ email, senha });
        if (!dadosValidos.success) return toast.warning('E-mail ou senha inválidos!');

        try {
            mostrarCarregando();

            const response = await api.post('/entrar', dadosValidos.data);

            const { token, usuario }: LoginResponse = response.data;

            localStorage.setItem('bolao:token', token);
            localStorage.setItem('bolao:usuario', JSON.stringify(usuario));

            navegar('/');
        } catch (erro) {
            const erroAxios = erro as AxiosError<RespostaErro>;

            if (!erroAxios.response) {
                return toast.error('Erro de conexão com o servidor. Tente mais tarde!');
            }

            const { codigo } = erroAxios.response.data;

            if (codigo === 400) return toast.warning('Campos inválidos!');

            if (codigo === 401) return toast.warning('E-mail ou senha incorretos!');

            if (codigo === 500) return toast.error('Erro no servidor, contate o suporte!');
        } finally {
            esconderCarregando();
        }
    };

    return (
        <LoginContainer>
            <LadoMarca>
                <img src="/images/logo.png" alt="Logo do Bolão" />
                <div>
                    <h1>Olá, Bem-vindo!</h1>
                    <p>
                        Seu chute certo está aqui, palpite e acerte o resultado.
                        <br />
                        Jogue com os amigos!
                    </p>
                </div>
            </LadoMarca>

            <CartaoLogin>
                <CabecalhoCartao>
                    <img src="/images/logo.png" alt="Logo do Bolão" />
                    <h2>Acesse sua conta</h2>
                    <p>Insira suas credenciais e faça seu palpite</p>
                </CabecalhoCartao>

                <FormularioLogin onSubmit={aoEnviar}>
                    <div>
                        <InputTexto
                            label="E-mail"
                            type="email"
                            placeholder="Digite seu email..."
                            required={true}
                            name="email"
                            value={email}
                            onChange={(evento) => setEmail(evento.target.value)}
                        />
                        <InputTexto
                            label="Senha"
                            type="password"
                            placeholder="Digite sua senha..."
                            required={true}
                            name="senha"
                            value={senha}
                            onChange={(evento) => setSenha(evento.target.value)}
                        />
                        <div className="checkbox">
                            <input type="checkbox" id="lembrar-me" />
                            <label htmlFor="lembrar-me">Lembrar-me</label>
                        </div>
                    </div>
                    <Botao tipo="submit" texto="Enviar" variante="principal" />
                </FormularioLogin>

                <RodapeCartao>
                    <Link to="/recuperar-senha">Esqueceu sua senha?</Link>
                    <Link to="/cadastrar">
                        Não tem uma conta? <span>Cadastre-se</span>
                    </Link>
                </RodapeCartao>
            </CartaoLogin>
        </LoginContainer>
    );
};

export default Login;
