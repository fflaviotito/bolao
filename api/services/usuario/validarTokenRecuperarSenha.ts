import z from 'zod';
import { selecionarTokenRecuperacao } from '../../repositories/usuarioRepository';
import { AppError } from '../../utils/AppError';
import { emailRegra, tokenRegra } from '../../validators/regras';
import { formatarErrosZod } from '../../utils/formatarErrosZod';

const validarTokenRecuperarSenha = async (email: string, token: string) => {
    const dadosLimpos = validarEntrada({ email, token });

    const registroToken = await selecionarTokenRecuperacao(dadosLimpos.token);
    if (!registroToken) throw new AppError('Código inválido.', 400);
    if (registroToken.usuario.email !== dadosLimpos.email) throw new AppError('Código inválido.', 400);

    const agora = new Date();
    if (agora > registroToken.expiraEm) {
        throw new AppError('Código expirado. Solicite um novo.', 400);
    }

    return true;
};

const validarEntrada = (dados: { email: string; token: string }) => {
    const loginSchema = z.object({
        email: emailRegra,
        token: tokenRegra
    });

    const validacao = loginSchema.safeParse(dados);

    if (!validacao.success) {
        const errosDetalhados = formatarErrosZod(validacao.error);
        throw new AppError('Erro de validação nos campos.', 400, errosDetalhados);
    }

    return validacao.data;
};

export default validarTokenRecuperarSenha;
