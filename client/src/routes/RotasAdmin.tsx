import { Route, Routes } from 'react-router-dom';
import PainelAdmin from '../layouts/PainelAdmin';
import CampeonatosAdmin from '../pages/admin/CampeonatosAdmin';

const RotasAdmin = () => {
    return (
        <Routes>
            <Route element={<PainelAdmin />}>
                <Route index element={<h1>Home do Painel do ADM!</h1>} />
                <Route path="/campeonatos" element={<CampeonatosAdmin />} />
                <Route path="/estadios" element={<h1>Estádios do Painel do ADM!</h1>} />
                <Route path="/times" element={<h1>Times do Painel do ADM!</h1>} />
                <Route path="/usuarios" element={<h1>Usuários do Painel do ADM!</h1>} />
            </Route>
        </Routes>
    );
};

export default RotasAdmin;
