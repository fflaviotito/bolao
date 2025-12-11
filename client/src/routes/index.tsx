import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import EsqueciSenha from '../pages/EsqueciSenha';
import RotasPrivadas from './RotasPrivadas';
import Inicio from '../pages/Inicio';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/entrar" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/esqueci-senha" element={<EsqueciSenha />} />
            <Route element={<RotasPrivadas />}>
                <Route path="/" element={<Inicio />} />
            </Route>
            <Route path="*" element={<Navigate to="/entrar" />} />
        </Routes>
    );
};

export default AppRoutes;
