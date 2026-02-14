import z from 'zod';
import { campoOpcional } from '../../utils/zodHelper';
import { escudoRegra, nomePadraoRegra, siglaTimeRegra } from '../../validators/regras';
import type { Request, Response } from 'express';
import { validarFormulario } from '../../utils/validarFormulario';
import { AppError } from '../../utils/AppError';
import { registrarTime } from '../../services/time/registrarTime';

const schema = z.object({
    escudo: escudoRegra,
    estadioId: campoOpcional(z.string()),
    nomeOficial: campoOpcional(nomePadraoRegra),
    nomePopular: nomePadraoRegra,
    sigla: siglaTimeRegra
});

export const criarTime = async (req: Request, res: Response) => {
    const dadosValidos = validarFormulario({ dados: req.body, schema });

    const usuarioId = req.usuarioId;
    if (!usuarioId) throw new AppError('Usuário não autenticado.', 401);

    const novoTime = await registrarTime({
        ...dadosValidos,
        criadoPorId: usuarioId
    });

    return res.json(novoTime)
};
