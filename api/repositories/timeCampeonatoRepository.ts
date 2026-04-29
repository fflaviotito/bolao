import type { Prisma } from '@prisma/client';
import prisma from '../db';

export const deletarCampanha = async (campeonatoId: string, timeId: string) => {
    return await prisma.timesPorCampeonato.delete({
        where: {
            campeonatoId_timeId: {
                campeonatoId,
                timeId
            }
        }
    });
};

export const inserirCampanha = async (dados: Prisma.TimesPorCampeonatoUncheckedCreateInput) => {
    return await prisma.timesPorCampeonato.create({
        data: dados
    });
};

export const selecionarCampanhaPorTimeCampeonato = async (campeonatoId: string, timeId: string) => {
    return await prisma.timesPorCampeonato.findUnique({
        where: {
            campeonatoId_timeId: {
                campeonatoId: campeonatoId,
                timeId: timeId
            }
        }
    });
};

export const selecionarTodasCampanhasPorCampeonato = async (campeonatoId: string) => {
    return await prisma.timesPorCampeonato.findMany({
        where: {
            campeonatoId: campeonatoId
        },
        include: {
            time: true
        },
        orderBy: [
            { ponto: 'desc' },
            { vitoria: 'desc' },
            { saldoGol: 'desc' },
            { golProprio: 'desc' },
            { time: { nomePopular: 'asc' } }
        ]
    });
};
