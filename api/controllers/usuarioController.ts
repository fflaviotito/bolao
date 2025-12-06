import type { Request, Response } from 'express';
import { registrarUsuario } from '../services/usuario/registrarUsuario';
import { autenticarUsuario } from '../services/usuario/autenticarUsuario';
import gerarTokenRecuperarSenha from '../services/usuario/gerarTokenRecuperarSenha';
import validarTokenRecuperarSenha from '../services/usuario/validarTokenRecuperarSenha';
import { tratarErroController } from '../utils/tratarErroController';
import { redefinirSenha } from '../services/usuario/redefinirSenha';

export const criarUsuario = async (req: Request, res: Response) => {
    try {
        const { nome, email, senha, senhaConfirmacao } = req.body;

        const usuarioCriado = await registrarUsuario({
            nome,
            email,
            senhaPura: senha,
            senhaConfirmacao
        });

        return res.status(201).json(usuarioCriado);
    } catch (error) {
        return tratarErroController(res, error);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, senha } = req.body;

        const resultado = await autenticarUsuario({
            email,
            senhaPura: senha
        });

        return res.status(200).json(resultado);
    } catch (error) {
        return tratarErroController(res, error);
    }
};

export const esqueciSenha = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const resultado = await gerarTokenRecuperarSenha(email);

        return res.status(200).json(resultado);
    } catch (error) {
        return tratarErroController(res, error);
    }
};

export const conferirToken = async (req: Request, res: Response) => {
    try {
        const { email, token } = req.body;

        const resultado = await validarTokenRecuperarSenha(email, token);

        return res.status(200).json(resultado);
    } catch (error) {
        return tratarErroController(res, error);
    }
};

export const atualizarSenha = async (req: Request, res: Response) => {
    try {
        const { token, email, senha, senhaConfirmacao } = req.body;

        const resultado = await redefinirSenha({
            token,
            email,
            senhaPura: senha,
            senhaConfirmacao
        });

        return res.status(200).json(resultado);
    } catch (error) {
        return tratarErroController(res, error);
    }
};
