import { inserirUsuario, selecionarUsuarioPorEmail } from '../../repositories/usuarioRepository';
import type { RegistrarUsuarioEntrada } from '../../types/usuarioTypes';
import { z } from 'zod';
import { emailRegra, nomeRegra, senhaForteRegra } from '../../validators/regras';
import { formatarErrosZod } from '../../utils/formatarErrosZod';
import { AppError } from '../../utils/AppError';
import { hash } from 'bcryptjs';
import type { Usuario } from '@prisma/client';

/**
 * Realiza o processo completo de registro de um novo usuário no sistema.
 * @param dados - Objeto contendo nome, email, senha e confirmação.
 * @returns O objeto do usuário criado, sem a senha.
 * @throws Erro 400 - Se houver erro de validação nos campos ou senhas diferentes.
 * @throws Erro 409 - Se o e-mail já estiver cadastrado.
 */
export const registrarUsuario = async (dados: RegistrarUsuarioEntrada) => {
    const dadosLimpos = validarEntrada(dados);

    if (dadosLimpos.senhaPura !== dadosLimpos.senhaConfirmacao) {
        throw new AppError('As senhas não conferem.', 400, {
            senhaConfirmacao: ['As senhas não conferem']
        });
    }

    const usuarioExiste = await selecionarUsuarioPorEmail(dadosLimpos.email);
    if (usuarioExiste) {
        throw new AppError('E-mail já cadastrado.', 409, {
            email: ['E-mail já cadastrado']
        });
    }

    const senhaHash = await hash(dadosLimpos.senhaPura, 8);

    const novoUsuario = await inserirUsuario({
        nome: dadosLimpos.nome,
        email: dadosLimpos.email,
        senha: senhaHash
    });

    return mapearParaUsuarioSaida(novoUsuario);
};

const validarEntrada = (dados: RegistrarUsuarioEntrada) => {
    const schemaRegistro = z.object({
        nome: nomeRegra,
        email: emailRegra,
        senhaPura: senhaForteRegra,
        senhaConfirmacao: z.string()
    });

    const validacao = schemaRegistro.safeParse(dados);

    if (!validacao.success) {
        const errosDetalhados = formatarErrosZod(validacao.error);
        throw new AppError('Erro de validação nos campos.', 400, errosDetalhados);
    }

    return validacao.data;
};

const mapearParaUsuarioSaida = (usuario: Usuario) => {
    const { senha, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
};
