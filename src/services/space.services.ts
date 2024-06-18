import { SpaceDALs } from "../database/data_access/space.dals";
import { ISpaceRequestData, ISpaceRequestUpdateStatus } from "../interfaces/spaceRequest.interfaces";
import { Available_equipmentsDALs } from "../database/data_access/available.dals";
import { ISpaceData } from "../interfaces/space.interface";
import { BadRequestError, NotFoundError, UnprocessedEntityError } from "../helpers/error.helpers";
import { SpaceRequestDALs } from "../database/data_access/space_request.dals";
import { UserDALs } from "../database/data_access/user.dals";
class SpaceServices {
  spaceDALs: SpaceDALs;
  available_equipmentsDALS: Available_equipmentsDALs;
  spaceRequestDALs: SpaceRequestDALs;
  userDALs: UserDALs;
  constructor() {
    this.spaceDALs = new SpaceDALs();
    this.available_equipmentsDALS = new Available_equipmentsDALs();
    this.spaceRequestDALs = new SpaceRequestDALs();
    this.userDALs = new UserDALs();
  }

 async createSpace({
  name,
  typeRoom,
  capacity,
  available_equipments,
  pavilion,
  acessibility,
}: ISpaceData) {

    const createdSpace = await this.spaceDALs.createSpace({
      name,
      typeRoom,
      capacity,
      pavilion,
      acessibility,
    });

    if (!createdSpace) {
      throw new Error("Space was not created");
    }

    let equipments: any[] = [];
    let result;
    let available = available_equipments;
    await Promise.all(
       available.map(async availableEquipament => {
        const { name, quantity } = availableEquipament;

         result = await this.available_equipmentsDALS.createAvailable({
          name,
          quantity,
          spaceId: createdSpace.id,
        });
        if (!result) {
            console.log("erro")
        }
        else{
           equipments.push(result);
        }
      })
    );

    return {
      createdSpace,
      equipments,
    };
}


  async getSpace() {
    const spaces = await this.spaceDALs.findSpaces();
    let spaceArray: { space: any; available_equipments: any[] }[] = [];
    await Promise.all(
      spaces.map(async (space) => {
        let result =
          await this.available_equipmentsDALS.findAvailablesbySpaceId(space.id);

        if (result) {
          spaceArray.push({ space, available_equipments: result });
        }
      })
    );
    return spaceArray;
  }

  async getSpaceId(id: number){
    const result = await this.spaceDALs.findSpaceById(id);
    const available_equipments = await this.available_equipmentsDALS.findAvailablesbySpaceId(id);
    return {space: result, available_equipments: available_equipments};
  }
  async getSpacesRequestBySpace(spaceId: number){
     const space = await this.spaceDALs.findSpaceById(spaceId);
     if(!space){
      throw new NotFoundError({message: 'Espaço não encontrado'});
     }
     const spaceRequests = await this.spaceRequestDALs.findSpaceRequestBySpace(spaceId);

     return spaceRequests;
  }
  async updateSpace(
    id: number,
    {
      name,
      typeRoom,
      capacity,
      available_equipments,
      pavilion,
      acessibility,
    }: ISpaceData
  ) {
    const space = await this.spaceDALs.findSpaceById(id);

    if (!space) {
      throw new NotFoundError({ message: "espaço não encontrado" });
    }

    const updateSpace = await this.spaceDALs.updateSpace({
      id,
      name,
      typeRoom,
      capacity,
      pavilion,
      acessibility,
    });
    const deleteAvailables =
      await this.available_equipmentsDALS.deleteAvailableBySpaceId(space.id);

    let equipments: any[] = [];
    await Promise.all(
      available_equipments.map(async (availableEquipament) => {
        const { name, quantity } = availableEquipament;

        let result = await this.available_equipmentsDALS.createAvailable({
          name,
          quantity,
          spaceId: space.id,
        });
        if (result) {
          equipments.push(result);
        }
      })
    );

    return {
      updateSpace,
      equipments,
    };
  }

async createSpaceRequest({
  spaceId,
  initial_Period,
  end_Period,
  email,
}: ISpaceRequestData) {
  const user = await this.userDALs.findUserByEmail(email);
  if (!user) {
    throw new NotFoundError({ message: "Usuario não encontrado" });
  }
  const space = await this.spaceDALs.findSpaceById(spaceId);
  if (!space) {
    throw new NotFoundError({ message: "Espaço não encontrado" });
  }

  /*if (end_Period <= initial_Period) {
    throw new UnprocessedEntityError({ message: "A data final deve ser posterior à data inicial." });
  }

  const spacesRequests = await this.spaceRequestDALs.findSpaceRequestBySpace(spaceId);

  spacesRequests.forEach((spaceRequest) => {
    if (
      (initial_Period >= spaceRequest.initial_Period && initial_Period <= spaceRequest.end_Period) ||
      (end_Period >= spaceRequest.initial_Period && end_Period <= spaceRequest.end_Period) ||
      (initial_Period <= spaceRequest.initial_Period && end_Period >= spaceRequest.end_Period)
    ) {
      if (spaceRequest.status === "CONCLUIDO") {
        //throw new UnprocessedEntityError({ message: "Este espaço já foi reservado no período solicitado." });
        console.log("data errada")
      }
    }
  });*/ // preciso corrigir essa budega aqui 

  const createdSpaceRequest = await this.spaceRequestDALs.CreateSpaceResquest(
    { spaceId: space.id, initial_Period, end_Period, userId: user.id }
  );

  return createdSpaceRequest;
}

async getSpaceRequest(email: string){
    const user = await this.userDALs.findUserByEmail(email);
    if(!user){
      throw new NotFoundError({message: "Usuario não encontrado"});
    }
    
    const space_request = await this.spaceRequestDALs.findSpaceRequestByUser(user.id);
    return space_request;
}

async getAllSpaceRequest(){
    const space_request = await this.spaceRequestDALs.findAllSpacesRequests();
    return space_request;
}

async cancelSpaceRequest(id: number){
  const cancelSpace = await this.spaceRequestDALs.updateStatusSpaceRequest({id, status: "CANCELADO"});
  return cancelSpace;
}
async deleteSpace(spaceId: number){
  const deleteSpace = await this.spaceDALs.deleteSpace(spaceId);
  return deleteSpace;
}
async changeStatusSpaceRequest({id, status}: ISpaceRequestUpdateStatus){
  const spaceRequest = await this.spaceRequestDALs.findSpaceRequestById(id);
  if(!spaceRequest){
    throw new NotFoundError({message: "requisição de espaço não encontrada"});
  }
  const updatedSpaceRequest = await this.spaceRequestDALs.updateStatusSpaceRequest({id, status});
  return updatedSpaceRequest;
}

}

export { SpaceServices };
