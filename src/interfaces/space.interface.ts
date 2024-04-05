import { Available_equipment } from "@prisma/client";
export interface ISpaceCreate{
    name: string;
    typeRoom: string;
    pavilion: string;
    acessibility: string[]; 
    capacity: number;
}

export interface ISpaceData{
    name: string;
    typeRoom: string;
    pavilion: string;
    acessibility: string[]; 
    capacity: number;
    available_equipments: Available_equipment[];
}

export interface ISpaceUpdate{
    id: number;
    name: string;
    typeRoom: string;
    pavilion: string;
    acessibility: string[]; 
    capacity: number;
}
