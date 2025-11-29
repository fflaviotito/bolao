export class AppError extends Error {
    public readonly statusCode: number;
    public readonly errors?: Record<string, string[]> | undefined;

    constructor(message: string, statusCode = 400, errors?: Record<string, string[]>) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
