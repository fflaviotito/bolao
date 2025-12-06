import prisma from '../db';
import type { Prisma } from '@prisma/client';

export const selecionarUsuarioPorEmail = async (email: string) => {
    return await prisma.usuario.findUnique({
        where: { email }
    });
};

export const inserirUsuario = async (dados: Prisma.UsuarioCreateInput) => {
    return await prisma.usuario.create({
        data: dados
    });
};

export const selecionarTodosUsuarios = async () => {
    return await prisma.usuario.findMany({
        select: {
            id: true,
            nome: true,
            email: true,
            papel: true,
            ativo: true
        }
    });
};

export const inserirTokenRecuperacao = async (dados: Prisma.TokenRecuperacaoUncheckedCreateInput) => {
    return await prisma.tokenRecuperacao.create({
        data: dados
    });
};

export const selecionarTokenRecuperacao = async (token: string) => {
    return await prisma.tokenRecuperacao.findUnique({
        where: { token },
        include: { usuario: true }
    });
};

export const deletarTokensPorUsuarioId = async (usuarioId: number) => {
    return await prisma.tokenRecuperacao.deleteMany({
        where: { usuarioId }
    });
};

export const atualizarSenhaUsuario = async (usuarioId: number, novaSenhaHash: string) => {
    return await prisma.usuario.update({
        where: { id: usuarioId },
        data: { senha: novaSenhaHash }
    });
};
