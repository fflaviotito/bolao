import { useEffect, type ReactNode } from 'react';
import * as S from './style';
import { X } from 'lucide-react';

interface ModalProps {
    aberto: boolean;
    aoFechar: () => void;
    children: ReactNode;
    titulo: string;
}

const Modal = ({ aberto, aoFechar, children, titulo }: ModalProps) => {
    useEffect(() => {
        const aoApertarEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') aoFechar();
        };
        if (aberto) window.addEventListener('keydown', aoApertarEsc);
        return () => window.removeEventListener('keydown', aoApertarEsc);
    }, [aberto, aoFechar]);

    if (!aberto) return null;

    return (
        <S.Overlay>
            <S.Container>
                <S.Cabecalho>
                    <h2>{titulo}</h2>
                    <button type="button" onClick={aoFechar}>
                        {<X size={24} strokeWidth={3} />}
                    </button>
                </S.Cabecalho>
                {children}
            </S.Container>
        </S.Overlay>
    );
};

export default Modal;
