export interface IUserCreate{
    email: string;
    role: string[];
    favorites_space: number[];
}
export interface IUserUpdate{
    id: number;
    email: string;
    role: string[];
    favorites_space: number[];
}