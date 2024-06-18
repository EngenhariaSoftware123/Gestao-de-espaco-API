import { UserDALs } from "../database/data_access/user.dals";
import { BadRequestError, NotFoundError, UnprocessedEntityError } from "../helpers/error.helpers";
import { TeacherDALs } from "../database/data_access/teacher.dals";
import { ITeacherData } from "../interfaces/teacher.interface";
import { IManagerData} from "../interfaces/manager.interfaces";
import { ManagerDALs} from "../database/data_access/manager.dals"
import { SpaceDALs} from "../database/data_access/space.dals"
import { IManagerFindData } from "../interfaces/manager.interfaces";
class ManagerServices {
  userDALs: UserDALs;
  managerDALs: ManagerDALs;
  spaceDALs: SpaceDALs;
  constructor() {
    this.userDALs = new UserDALs();
    this.managerDALs = new ManagerDALs();
    this.spaceDALs = new SpaceDALs();
  }
  async createManager({ email, type, spaceId  }: IManagerData) {
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
      if (!user.roles.includes(type)) {
        updateRole.push(type);
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
        const createRole = [type];
        const createUser = await this.userDALs.createUser({
        email: email,
        role: createRole,
        favorites_space: [],
        });
        userId = createUser.id;
    }

    const createdManager = await this.managerDALs.createManager({type, userId, spaceId});

    return createdManager;
    
    
  }

  async findManager({email, type}: IManagerFindData){
      const user = await this.userDALs.findUserByEmail(email);
      if(!user){
        throw new NotFoundError({message: 'user not found'});
      }

      const result = await this.managerDALs.findManagerByUserIdAndType({id: user.id, type});

      return result;
  }
}

export {ManagerServices}