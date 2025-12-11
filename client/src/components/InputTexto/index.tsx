import type { ChangeEvent } from 'react';
import { Container } from './style';

interface InputTextoProps {
    label: string;
    type?: 'text' | 'password' | 'email';
    placeholder: string;
    required?: boolean;
    name: string;
    value: string;
    onChange: (evento: ChangeEvent<HTMLInputElement>) => void;
}

const InputTexto = ({
    label,
    type = 'text',
    placeholder,
    required = false,
    name,
    value,
    onChange
}: InputTextoProps) => {
    return (
        <Container>
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
        </Container>
    );
};

export default InputTexto;
