import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import Carregando from '../components/Carregando';

interface CarregandoContextDados {
    carregando: boolean;
    mostrarCarregando: () => void;
    esconderCarregando: () => void;
}

const CarregandoContext = createContext<CarregandoContextDados>({} as CarregandoContextDados);

export const CarregandoProvider = ({ children }: { children: ReactNode }) => {
    const [carregando, setCarregando] = useState(false);

    const mostrarCarregando = useCallback(() => {
        setCarregando(true);
    }, []);

    const esconderCarregando = useCallback(() => {
        setCarregando(false);
    }, []);

    const valor = useMemo(() => ({
        carregando,
        mostrarCarregando,
        esconderCarregando
    }), [carregando, mostrarCarregando, esconderCarregando]);

    return (
        <CarregandoContext.Provider value={ valor }>
            {children}
            {carregando && <Carregando />}
        </CarregandoContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCarregando = () => {
    const context = useContext(CarregandoContext);

    if (!context) {
        throw new Error('useLoading deve ser usado dentro de um CarregandoProvider');
    }

    return context;
};
