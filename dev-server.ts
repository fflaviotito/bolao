import app from './api/index';

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🔥 Dev Server ON: http://localhost:${PORT}/api`);
});