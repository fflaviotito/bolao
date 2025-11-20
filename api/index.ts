import express from 'express';
import prisma from './db';
import type { Request, Response } from 'express';

const app = express();
app.use(express.json());

app.get('/api/usuarios', async (req: Request, res: Response) => {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
});

app.post('/api/usuarios', async (req: Request, res: Response) => {
    try {
        const { nome, email, senha } = req.body;

        const novoUsuario = await prisma.usuario.create({
            data: {
                nome: nome,
                email: email,
                senha: senha
            }
        });

        res.json(novoUsuario);
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao criar usuário', detalhe: error });
    }
});

export default app;
