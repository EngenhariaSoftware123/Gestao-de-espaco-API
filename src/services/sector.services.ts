import { UserDALs } from "../database/data_access/user.dals";
import { BadRequestError, NotFoundError, UnprocessedEntityError } from "../helpers/error.helpers";
import { ISectorCreate, ISectorData } from "../interfaces/sector.interface";
import {SpaceDALs} from "../database/data_access/space.dals";
import { SectorDALs } from "../database/data_access/sector.dals";

class SectorServices {
  userDALs: UserDALs;
  spaceDALs: SpaceDALs;
  sectorDALs: SectorDALs;

  constructor() {
    this.userDALs = new UserDALs();
    this.sectorDALs = new SectorDALs();
    this.spaceDALs = new SpaceDALs();
  }
  async createSector({ name, spaceId, contact, email, acronym }: ISectorData) {
   const user = await this.userDALs.findUserByEmail(email);
   let userId;
    if (!email.endsWith("@uesb.edu.br")) {
      throw new BadRequestError({
        message: "email não tem o dominio @uesb.edu.br",
      });
    }

   const space = await this.spaceDALs.findSpaceById(spaceId);
   if ((!space)) {
    throw new BadRequestError({message:"espaço não encontrado"});
   }

    if (user) {
      let updateRole = user.roles;
      if (!user.roles.includes("SETOR")) {
        updateRole.push("SETOR");
      }
      const updateUser = await this.userDALs.updateUser({
        id: user.id,
        email: email,
        role: updateRole,
        favorites_space: [],
      });
      userId = user.id;
      
    }
    else{
        const createRole = ["SETOR"];
        const createUser = await this.userDALs.createUser({
        email: email,
        role: createRole,
        favorites_space: [],
        });
        userId = createUser.id;
    }

   const createdSector =  await this.sectorDALs.createSector({name, spaceId: space.id, contact, userId: userId, acronym });

   return createdSector;
    
    
  }
}

export { SectorServices };
