import { Navigate, Outlet } from 'react-router-dom';

const RotasPrivadas = () => {
    const isAuth = localStorage.getItem('bolao:token');

    return isAuth ? <Outlet /> : <Navigate to="/entrar" />;
};

export default RotasPrivadas;
