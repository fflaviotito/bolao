import z from 'zod';

export const campoOpcional = (schema: z.ZodString) => {
    return z
        .preprocess(
            (val) => (val === '' ? null : val),
            schema.nullish()
        )
        .transform((val) => val ?? null);
};
