export interface AuthResponse {
    access: {
        token: string;
        expiresAt: number;
    };
    refresh: {
        token: string;
        expiresAt: number;
    };
}
