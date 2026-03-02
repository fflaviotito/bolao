import { Route, Routes } from 'react-router-dom';
import PainelAdmin from '@/layouts/PainelAdmin';
import CampeonatosAdmin from '@/pages/admin/CampeonatosAdmin';
import EstadiosAdmin from '@/pages/admin/EstadiosAdmin';
import TimesAdmin from '@/pages/admin/TimesAdmin';
import PainelCampeonatoAdmin from '@/pages/admin/CampeonatosAdmin/PainelCampeonato';
import TimesDoCampeonato from '@/pages/admin/CampeonatosAdmin/PainelCampeonato/Times';

const RotasAdmin = () => {
    return (
        <Routes>
            <Route element={<PainelAdmin />}>
                <Route index element={<h1>Home do Painel do ADM!</h1>} />
                <Route path="/campeonatos">
                    <Route index element={<CampeonatosAdmin />} />
                    <Route path=":id">
                        <Route index element={<PainelCampeonatoAdmin />} />
                        <Route path="times" element={<TimesDoCampeonato />} />
                        <Route path="jogos" element={<h1>Cria rodadas e jogos</h1>} />
                        <Route
                            path="classificacao"
                            element={<h1>Confere a classificação oficial do campeonato</h1>}
                        />
                    </Route>
                </Route>
                <Route path="/estadios" element={<EstadiosAdmin />} />
                <Route path="/times" element={<TimesAdmin />} />
                <Route path="/usuarios" element={<h1>Usuários do Painel do ADM!</h1>} />
            </Route>
        </Routes>
    );
};

export default RotasAdmin;
