import { PaginacaoRepositorio } from '../types/Paginacao';
import prisma from '../db';
import { Prisma } from '@prisma/client';

export const inserirEstadio = async (dados: Prisma.EstadioUncheckedCreateInput) => {
    return await prisma.estadio.create({
        data: dados
    });
};

export const selecionarTodosEstadios = async (busca: string, limite:number) => {
    const where = busca ? { nomePopular: { contains: busca } } : {};

    return await prisma.estadio.findMany({ where, take:limite, orderBy: [{ nomePopular: 'asc' }] });
};

export const selecionarEstadiosPaginado = async ({ skip, take, busca }: PaginacaoRepositorio) => {
    const where = busca ? { nomePopular: { contains: busca } } : {};

    const [total, estadios] = await prisma.$transaction([
        prisma.estadio.count({ where }),

        prisma.estadio.findMany({
            skip,
            take,
            where,
            orderBy: [{ nomePopular: 'asc' }]
        })
    ]);

    return { total, estadios };
};

export const selecionarEstadioPorId = async (id: string) => {
    return await prisma.estadio.findUnique({
        where: { id }
    });
};

export const selecionarEstadioPorNome = async (
    nomePopular: string,
    nomeOficial?: string | null
) => {
    return await prisma.estadio.findFirst({
        where: {
            OR: [{ nomePopular }, ...(nomeOficial ? [{ nomeOficial }] : [])]
        }
    });
};
