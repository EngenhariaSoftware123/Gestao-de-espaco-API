import {UserDALs} from '../database/data_access/user.dals';
import { BadRequestError, NotFoundError } from '../helpers/error.helpers';
import { IFavoriteData, IUserRoles} from '../interfaces/user.interfaces';
import {SpaceDALs} from '../database/data_access/space.dals'

class UserServices{

    userDALs: UserDALs;
    spaceDALs: SpaceDALs;
    constructor(){
        this.userDALs = new UserDALs();
        this.spaceDALs = new SpaceDALs();
    }
    async authUsers(email: string){
        const user = await this.userDALs.findUserByEmail(email);
        if(!email.endsWith("@uesb.edu.br")){
            throw new BadRequestError({message: "email não tem o dominio @uesb.edu.br"})
        }

        if(user){
            let updateRole = user.roles;
            if(!user.roles.includes("ALUNO")){
                 updateRole.push("ALUNO");
            }
            const updateUser = await this.userDALs.updateUser({id: user.id, email: email, role: updateRole, favorites_space: []});
            return updateUser;
        }
         const createRole = ["ALUNO"];
        const createUser = await this.userDALs.createUser({email: email, role: createRole, favorites_space: [] });
        return createUser;
    }

    async favoriteSpaces({email, spaceId}:IFavoriteData){
        const user = await this.userDALs.findUserByEmail(email);
        if(!user){
            throw new NotFoundError({message: "usuario nao encontrado"})
        }
        
        const spaceFavorited = await this.userDALs.favoriteSpace({id: user.id, spaceId});
        return spaceFavorited;
    }
     async unFavoriteSpaces({email, spaceId}:IFavoriteData){
        const user = await this.userDALs.findUserByEmail(email);
        if(!user){
            throw new NotFoundError({message: "usuario nao encontrado"})
        }
        
        const spaceunFavorited = await this.userDALs.unFavoriteSpace({id: user.id, spaceId});
        return spaceunFavorited;
    }

    async getUsers(){
        const users = await this.userDALs.getUsers();
        return users;
    }

    async findUserByEmail(email: string){
        const user = await this.userDALs.findUserByEmail(email);
        return user;
    }
    async updateRole({email, roles}: IUserRoles){
        const user = await this.userDALs.findUserByEmail(email);
        if(!user){
            throw new BadRequestError({message: 'user not found'});
        }
        const updateUser = await this.userDALs.updateUser({id: user.id, email: email, role: roles, favorites_space: user.favorite_spaces});
        return updateUser;
        
    }
    
}

export {UserServices}