export interface User {
    id: number,
    name: string,
    email: string,
    passwordHash: string,
    role: 'user' | 'admin',
    active: boolean,
    created_at: Date
}

export interface UserCreateInput {
    name: string,
    email: string,
    passwordHash: string,
    role: 'user' | 'admin',
}

export interface UserUpdateData {
    id: number,
    name?: string,
    passwordHash?: string,
    role?: 'user' | 'admin',
}