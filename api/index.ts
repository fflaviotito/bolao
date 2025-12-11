import express from 'express';
import cors from 'cors';
import type { Request, Response } from 'express';
import usuarioRouter from './routes/usuarioRoutes';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}))

app.use(express.json());

app.get('/api', (req: Request, res: Response) => {
    res.send('Backend do Bolão está ON!');
});

app.use('/api', usuarioRouter);

export default app;
