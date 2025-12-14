import type { ChangeEvent } from 'react';
import { Container, ListaErros } from './style';
import type { ErrosPorCampo } from '../../utils/formatarErrosZod';

interface InputTextoProps {
    label: string;
    type?: 'text' | 'password' | 'email';
    placeholder: string;
    required?: boolean;
    name: string;
    value: string;
    onChange: (evento: ChangeEvent<HTMLInputElement>) => void;
    erros: ErrosPorCampo;
}

const InputTexto = ({
    label,
    type = 'text',
    placeholder,
    required = false,
    name,
    value,
    onChange,
    erros
}: InputTextoProps) => {
    const errosDesteCampo = erros ? erros[name] : undefined;
    const temErro = Boolean(errosDesteCampo)

    return (
        <Container $temErro={temErro}>
            <label htmlFor={label}>{label}:</label>
            <input
                type={type}
                placeholder={placeholder}
                id={label}
                required={required}
                name={name}
                value={value}
                onChange={onChange}
            />
            {errosDesteCampo && (
                <ListaErros>
                    {errosDesteCampo.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ListaErros>
            )}
        </Container>
    );
};

export default InputTexto;
