export interface ISpaceRequestCreate{
   spaceId: number;
   initial_Period: Date;
   end_Period: Date;
   userId: number;
}

export interface ISpaceRequestData{
   spaceId: number;
   initial_Period: Date;
   end_Period: Date;
   email: string;
}

export interface ISpaceRequestUpdateStatus{
   id: number;
   status: string;
}