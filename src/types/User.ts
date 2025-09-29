export interface NewUserData {
    name: string,
    email: string,
    passwordHash: string,
    role?: 'user' | 'admin',
}