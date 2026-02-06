import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type ErrosValidacao = Record<string, string[]>;

interface BackendError {
    status: string;
    message: string;
    errors?: ErrosValidacao;
}

export const tratarErro = (error: unknown, setErros?: (erros: ErrosValidacao) => void) => {
    if (error instanceof AxiosError) {
        const dados = error.response?.data as BackendError;

        if (dados?.errors && setErros) {
            setErros(dados.errors);
        }

        if (dados?.message) {
            toast.error(dados.message);
            return;
        }
    }

    console.error(error);
    toast.error('Ocorreu um erro inesperado.');
};
