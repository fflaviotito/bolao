import express from 'express';
import type { Request, Response } from 'express';
import usuarioRouter from './routes/usuarioRoutes';

const app = express();
app.use(express.json());

app.get('/api', (req: Request, res: Response) => {
    res.send('Backend do Bolão está ON!');
});

app.use('/api', usuarioRouter);

export default app;
