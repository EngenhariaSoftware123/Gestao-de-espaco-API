export interface IMaintenanceCreate{
    userId: number;
    spaceId: number;
    description: string;
}
export interface IMaintenanceData{
     email: string;
    spaceId: number;
    description: string;
}

export interface IMaintenanceUpdate{
     id: number;
    status: string;
}