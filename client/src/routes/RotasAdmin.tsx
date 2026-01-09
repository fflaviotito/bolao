import { Route, Routes } from 'react-router-dom';
import PainelAdmin from '../layouts/PainelAdmin';

const RotasAdmin = () => {
    return (
        <Routes>
            <Route element={<PainelAdmin />}>
                <Route index element={<h1>Home do Painel do ADM!</h1>} />
                <Route path="/campeonatos" element={<h1>Campeonatos do Painel do ADM!</h1>} />
                <Route path="/estadios" element={<h1>Estádios do Painel do ADM!</h1>} />
                <Route path="/times" element={<h1>Times do Painel do ADM!</h1>} />
                <Route path="/usuarios" element={<h1>Usuários do Painel do ADM!</h1>} />
            </Route>
        </Routes>
    );
};

export default RotasAdmin;
