import app from './api/index';

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando localmente em http://localhost:${PORT}/api`);
    console.log(`Teste a rota de usuários: http://localhost:${PORT}/api/usuarios`);
});