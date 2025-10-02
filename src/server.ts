import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import { initializePool, testDbConnection } from './db.js';

const PORT = 3000;
const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Servidor do Bolão Rodando! Conexão OK.');
});

const startServer = async () => {
    initializePool(); 
    
    await testDbConnection();

    app.listen(PORT, () => {
        console.log(`✅ Servidor iniciado em: http://localhost:${PORT}`);
        console.log('----------------------------------------------------');
    });
};

startServer();
