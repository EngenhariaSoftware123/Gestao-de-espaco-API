export interface IManagerCreate{
    type: string;
    userId: number;
    spaceId: number;
}
export interface IManagerData{
    type: string;
    email: string;
    spaceId: number;
}

export interface IManagerFind{
    id: number;
    type: string;
}
export interface IManagerFindData{
    email: string;
    type: string;
}