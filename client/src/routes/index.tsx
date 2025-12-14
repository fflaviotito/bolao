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
            <Route path="/cadastrar" element={<Cadastro />} />
            <Route path="/recuperar-senha" element={<EsqueciSenha />} />
            <Route element={<RotasPrivadas />}>
                <Route path="/" element={<Inicio />} />
            </Route>
            <Route path="*" element={<Navigate to="/entrar" />} />
        </Routes>
    );
};

export default AppRoutes;
