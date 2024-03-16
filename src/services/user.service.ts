import {UserDALs} from '../data_access/user.dals';
class UserServices{

    userDALs: UserDALs;
    constructor(){
        this.userDALs = new UserDALs;
    }
    async authUsers(email: string){
        const user = await this.userDALs.findUserByEmail(email);

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
    async listUsers(){
        return {message: "hello from server"};
    }
}

export {UserServices}