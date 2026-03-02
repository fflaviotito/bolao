import type { Prisma } from '@prisma/client';
import prisma from '../db';
import { PaginacaoRepositorio } from '../types/Paginacao';

export const inserirCampeonato = async (dados: Prisma.CampeonatoUncheckedCreateInput) => {
    return await prisma.campeonato.create({
        data: dados
    });
};

export const selecionarCampeonatoPorId = async (id: string) => {
    return await prisma.campeonato.findUnique({
        where: { id }
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

export const selecionarCampeonatosPaginado = async ({
    skip,
    take,
    busca
}: PaginacaoRepositorio) => {
    const where = busca
        ? {
              OR: [
                  { nome: { contains: busca } },
                  { divisao: { contains: busca } },
                  ...(isNaN(Number(busca)) ? [] : [{ ano: { equals: Number(busca) } }])
              ]
          }
        : {};

    const [total, campeonatos] = await prisma.$transaction([
        prisma.campeonato.count({ where }),

        prisma.campeonato.findMany({
            skip,
            take,
            where,
            orderBy: [{ ano: 'desc' }, { nome: 'asc' }]
        })
    ]);

    return { total, campeonatos };
};
