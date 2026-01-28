import type { Prisma } from '@prisma/client';
import prisma from '../db';

export const inserirCampeonato = async (dados: Prisma.CampeonatoUncheckedCreateInput) => {
    return await prisma.campeonato.create({
        data: dados
    });
};

export const selecionarCampeonatoPorNomeDivisaoAno = async (
    nome: string,
    divisao: string,
    ano: number
) => {
    return await prisma.campeonato.findFirst({
        where: {
            nome: nome,
            divisao: divisao,
            ano: ano
        }
    });
};

export const selecionarCampeonatosPaginado = async (pagina: number, itensPorPagina: number) => {
    const [total, campeonatos] = await prisma.$transaction([
        prisma.campeonato.count(),

        prisma.campeonato.findMany({
            skip: (pagina - 1) * itensPorPagina,
            take: itensPorPagina,
            orderBy: [
                { ano: 'desc' },
                { nome: 'asc' }
            ]
        })
    ]);

    return { total, campeonatos };
};
