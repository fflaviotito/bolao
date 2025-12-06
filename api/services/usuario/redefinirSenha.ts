import z from 'zod';
import { emailRegra, senhaForteRegra, tokenRegra } from '../../validators/regras';
import { AppError } from '../../utils/AppError';
import { formatarErrosZod } from '../../utils/formatarErrosZod';
import {
    atualizarSenhaUsuario,
    deletarTokensPorUsuarioId,
    selecionarTokenRecuperacao
} from '../../repositories/usuarioRepository';
import { hash } from 'bcryptjs';

interface RedefinirSenhaEntrada {
    token: string;
    email: string;
    senhaPura: string;
    senhaConfirmacao: string;
}

export const redefinirSenha = async (dados: RedefinirSenhaEntrada) => {
    const dadosLimpos = validarEntrada(dados);

    if (dadosLimpos.senhaPura !== dadosLimpos.senhaConfirmacao) {
        throw new AppError('As senhas não conferem.', 400, {
            senhaConfirmacao: ['As senhas não conferem']
        });
    }

    const registroToken = await selecionarTokenRecuperacao(dadosLimpos.token);

    if (!registroToken) {
        throw new AppError('Token inválido ou expirado.', 400);
    }

    if (registroToken.usuario.email !== dadosLimpos.email) {
        throw new AppError('Token inválido.', 400);
    }

    if (new Date() > registroToken.expiraEm) {
        throw new AppError('Token expirado.', 400);
    }

    const novaSenhaHash = await hash(dadosLimpos.senhaPura, 8);

    await atualizarSenhaUsuario(registroToken.usuarioId, novaSenhaHash);

    await deletarTokensPorUsuarioId(registroToken.usuarioId);

    return { mensagem: 'Senha alterada com sucesso.' };
};

const validarEntrada = (dados: RedefinirSenhaEntrada) => {
    const schema = z.object({
        token: tokenRegra,
        email: emailRegra,
        senhaPura: senhaForteRegra,
        senhaConfirmacao: z.string()
    });

    const validacao = schema.safeParse(dados);

    if (!validacao.success) {
        throw new AppError('Erro de validação.', 400, formatarErrosZod(validacao.error));
    }
    return validacao.data;
};
