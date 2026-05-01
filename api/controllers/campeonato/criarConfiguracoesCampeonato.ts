import z from 'zod';
import type { Request, Response } from 'express';
import { numeroIntRegra, pontosRegra } from '../../validators/regras';
import { AppError } from '../../utils/AppError';
import { formatarErrosZod } from '../../utils/formatarErrosZod';
import { registrarConfiguracoes } from '../../services/campeonato/registrarConfiguracoes';

const schema = z.object({
    configuracao: z.object({
        quantidadeTimes: numeroIntRegra,
        quantidadeRodadas: numeroIntRegra
    }),
    regras: z.object({
        pontosEmpateExato: pontosRegra,
        pontosAcertoEmpate: pontosRegra,
        pontosPlacarExato: pontosRegra,
        pontosAcertoVencedor: pontosRegra,
        pontosGolTime: pontosRegra
    })
});

export const criarConfiguracoesCampeonato = async (req: Request, res: Response) => {
    const usuarioId = req.usuarioId;
    if (!usuarioId) throw new AppError('Usuário não autenticado.', 401);

    const { campeonatoId } = req.params;
    if (!campeonatoId) throw new AppError('ID do campeonato não informado na rota.', 400);

    const dadosValidos = schema.safeParse(req.body);
    if (!dadosValidos.success)
        throw new AppError('Erro de validação', 400, formatarErrosZod(dadosValidos.error));

    const novaConfiguracao = await registrarConfiguracoes({
        campeonatoId,
        configuracao: dadosValidos.data.configuracao,
        regras: dadosValidos.data.regras,
        criadoPorId: usuarioId
    });

    return res.status(201).json(novaConfiguracao);
};
