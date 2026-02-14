import express from 'express';
import cors from 'cors';
import type { Request, Response } from 'express';
import { errorMiddleware } from './middlewares/errorMiddleware';
import * as R from './routes';

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
    })
);

app.use(express.json());

app.get('/api', (req: Request, res: Response) => {
    res.send('Backend do Bolão está ON!');
});

app.use('/api', Object.values(R));

app.use(errorMiddleware);

export default app;
