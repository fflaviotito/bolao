import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/autenticacao/Login';
import Cadastro from '../pages/autenticacao/Cadastro';
import EsqueciSenha from '../pages/autenticacao/EsqueciSenha';
import RotasPrivadas from './RotasPrivadas';
import Inicio from '../pages/Inicio';
import RotasAdmin from './RotasAdmin';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/entrar" element={<Login />} />
            <Route path="/cadastrar" element={<Cadastro />} />
            <Route path="/recuperar-senha" element={<EsqueciSenha />} />
            <Route element={<RotasPrivadas />}>
                <Route path="/" element={<Inicio />} />
                <Route path="/admin/*" element={<RotasAdmin />} />
            </Route>
            <Route path="*" element={<Navigate to="/entrar" />} />
        </Routes>
    );
};

export default AppRoutes;
