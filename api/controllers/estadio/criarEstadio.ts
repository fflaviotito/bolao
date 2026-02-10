import z from 'zod';
import { campoOpcional } from '../../utils/zodHelper';
import { nomePadraoRegra } from '../../validators/regras';
import { Request, Response } from 'express';
import { validarFormulario } from '../../utils/validarFormulario';
import { AppError } from '../../utils/AppError';
import { registrarEstadio } from '../../services/estadio/registrarEstadio';

const schema = z.object({
    nomeOficial: campoOpcional(nomePadraoRegra),
    nomePopular: nomePadraoRegra
});

export const criarEstadio = async (req: Request, res: Response) => {
    const dadosValidos = validarFormulario({ dados: req.body, schema });

    const usuarioId = req.usuarioId;
    if (!usuarioId) throw new AppError('Usuário não autenticado.', 401);

    const novoEstadio = await registrarEstadio({
        ...dadosValidos,
        criadoPorId: usuarioId
    });

    return res.status(201).json(novoEstadio);
};
