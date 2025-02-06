export interface JwtRefreshToken {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}