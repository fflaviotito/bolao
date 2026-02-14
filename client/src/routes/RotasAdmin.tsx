import { Route, Routes } from 'react-router-dom';
import PainelAdmin from '@/layouts/PainelAdmin';
import CampeonatosAdmin from '@/pages/admin/CampeonatosAdmin';
import EstadiosAdmin from '@/pages/admin/EstadiosAdmin';
import TimesAdmin from '@/pages/admin/TimesAdmin';

const RotasAdmin = () => {
    return (
        <Routes>
            <Route element={<PainelAdmin />}>
                <Route index element={<h1>Home do Painel do ADM!</h1>} />
                <Route path="/campeonatos" element={<CampeonatosAdmin />} />
                <Route path="/estadios" element={<EstadiosAdmin />} />
                <Route path="/times" element={<TimesAdmin />} />
                <Route path="/usuarios" element={<h1>Usuários do Painel do ADM!</h1>} />
            </Route>
        </Routes>
    );
};

export default RotasAdmin;
