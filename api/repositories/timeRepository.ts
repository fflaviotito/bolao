import { Prisma } from '@prisma/client';
import prisma from '../db';
import { PaginacaoRepositorio } from '../types/Paginacao';

export const inserirTime = async (dados: Prisma.TimeUncheckedCreateInput) => {
    return await prisma.time.create({ data: dados });
};

export const selecionarTimesPaginado = async ({ skip, take, busca }: PaginacaoRepositorio) => {
    const where = busca ? { nomePopular: { contains: busca } } : {};

    const [total, times] = await prisma.$transaction([
        prisma.time.count({ where }),

        prisma.time.findMany({
            skip,
            take,
            where,
            orderBy: [{ nomePopular: 'asc' }],
            include: {
                estadio: {
                    select: { nomePopular: true }
                }
            }
        })
    ]);

    return { total, times };
};

export const selecionarTimePorNome = async (nomePopular: string, nomeOficial?: string | null) => {
    return await prisma.time.findFirst({
        where: {
            OR: [{ nomePopular }, ...(nomeOficial ? [{ nomeOficial }] : [])]
        }
    });
};

export const selecionarTodosTimes = async (busca: string, limite: number) => {
    const where = busca ? { nomePopular: { contains: busca } } : {};
    return await prisma.time.findMany({ where, take: limite, orderBy: [{ nomePopular: 'asc' }] });
};
