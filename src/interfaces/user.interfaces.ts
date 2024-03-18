import { Space } from "@prisma/client";
export interface IUserCreate{
    email: string;
    role: string[];
    favorites_space: Space[];
}
export interface IUserUpdate{
    id: number;
    email: string;
    role: string[];
    favorites_space: Space[];
}