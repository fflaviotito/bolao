import z from 'zod';
import {
    deletarTokensPorUsuarioId,
    inserirTokenRecuperacao,
    selecionarUsuarioPorEmail
} from '../../repositories/usuarioRepository';
import { AppError } from '../../utils/AppError';
import { formatarErrosZod } from '../../utils/formatarErrosZod';
import { emailRegra } from '../../validators/regras';
import { gerarCodigoVerificacao } from '../../utils/geradores';
import { enviarEmail } from '../../providers/email';

const gerarTokenRecuperarSenha = async (email: string) => {
    const dadosLimpos = validarEntrada({ email });

    const usuario = await selecionarUsuarioPorEmail(dadosLimpos.email);
    if (usuario) {
        const token = gerarCodigoVerificacao(6);

        const agora = new Date();
        agora.setHours(agora.getHours() + 1);

        await deletarTokensPorUsuarioId(usuario.id);
        await inserirTokenRecuperacao({
            usuarioId: usuario.id,
            token,
            expiraEm: agora
        });

        const mensagemHtml = `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2>Recuperação de Senha</h2>
                <p>Olá, <strong>${usuario.nome}</strong>!</p>
                <p>Você solicitou a recuperação de senha para o sistema <strong>Bolão</strong>.</p>
                <p>Use o código abaixo para redefinir sua senha:</p>
                <div style="background: #f4f4f4; padding: 15px; font-size: 24px; letter-spacing: 5px; text-align: center; font-weight: bold; border-radius: 5px;">
                    ${token}
                </div>
                <p style="font-size: 12px; color: #888;">Este código expira em 1 hora.</p>
            </div>
        `;

        await enviarEmail({
            para: usuario.email,
            assunto: 'Seu Código de Recuperação de Senha - Bolão',
            corpoHtml: mensagemHtml
        });
    }

    return {
        mensagem:
            'Se o e-mail estiver cadastrado, você receberá um link de recuperação em instantes.'
    };
};

const validarEntrada = (dados: { email: string }) => {
    const loginSchema = z.object({
        email: emailRegra
    });

    const validacao = loginSchema.safeParse(dados);

    if (!validacao.success) {
        const errosDetalhados = formatarErrosZod(validacao.error);
        throw new AppError('Erro de validação nos campos.', 400, errosDetalhados);
    }

    return validacao.data;
};

export default gerarTokenRecuperarSenha;
