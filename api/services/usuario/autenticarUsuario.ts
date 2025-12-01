import z from 'zod';
import { LoginEntrada } from '../../types/authTypes';
import { emailRegra, senhaPuraLogin } from '../../validators/regras';
import { formatarErrosZod } from '../../utils/formatarErrosZod';
import { AppError } from '../../utils/AppError';
import { selecionarUsuarioPorEmail } from '../../repositories/usuarioRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

/**
 * Realiza o processo completo de autenticação(login) de um usuário.
 * @param dados - Objeto contendo nome, e senha.
 * @returns O objeto com dados públicos do usuário e o token.
 * @throws Erro 400 - Se houver erro de validação nos campos.
 * @throws Erro 401 - Se o e-mail ou senha forem incorretos.
 * @throws Erro 500 - Se não identificar a senha do JWT no .env.
 */
export const autenticarUsuario = async (dados: LoginEntrada) => {
    const dadosLimpos = validarEntrada(dados);
    const { email, senhaPura } = dadosLimpos;

    const usuario = await selecionarUsuarioPorEmail(email);
    if (!usuario) throw new AppError('Email ou senha incorretos', 401);

    const senhaBate = await compare(senhaPura, usuario.senha);
    if (!senhaBate) throw new AppError('Email ou senha incorretos', 401);

    if (!process.env.JWT_SECRET) throw new AppError('Erro interno de configuração (JWT).', 500);

    const token = sign({}, process.env.JWT_SECRET, {
        subject: String(usuario.id),
        expiresIn: '1d'
    });

    return {
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            papel: usuario.papel
        },
        token
    };
};

const validarEntrada = (dados: LoginEntrada) => {
    const loginSchema = z.object({
        email: emailRegra,
        senhaPura: senhaPuraLogin
    });

    const validacao = loginSchema.safeParse(dados);

    if (!validacao.success) {
        const errosDetalhados = formatarErrosZod(validacao.error);
        throw new AppError('Erro de validação nos campos.', 400, errosDetalhados);
    }

    return validacao.data;
};
