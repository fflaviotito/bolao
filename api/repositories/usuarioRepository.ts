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
