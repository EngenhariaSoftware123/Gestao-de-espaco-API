import { UserDALs } from "../database/data_access/user.dals";
import { BadRequestError, NotFoundError, UnprocessedEntityError } from "../helpers/error.helpers";
import { TeacherDALs } from "../database/data_access/teacher.dals";
import { ITeacherData } from "../interfaces/teacher.interface";

class TeacherServices {
  userDALs: UserDALs;
  teacherDALs: TeacherDALs;
  constructor() {
    this.userDALs = new UserDALs();
    this.teacherDALs = new TeacherDALs();
  }
  async createTeacher({ name, enrollment, contact, email, department, subject }: ITeacherData) {
    const user = await this.userDALs.findUserByEmail(email);
    let userId;
    if (!email.endsWith("@uesb.edu.br")) {
      throw new BadRequestError({
        message: "email não tem o dominio @uesb.edu.br",
      });
    }
    const findEnrollment = await this.teacherDALs.findTeacherByEnrollment(enrollment);
    if(findEnrollment){
        throw new UnprocessedEntityError({message: "ja existe um usuario com essa matricula"})
    }

    if (user) {
      let updateRole = user.roles;
      if (!user.roles.includes("PROFESSOR")) {
        updateRole.push("PROFESSOR");
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
        const createRole = ["PROFESSOR"];
        const createUser = await this.userDALs.createUser({
        email: email,
        role: createRole,
        favorites_space: [],
        });
        userId = createUser.id;
    }

    const createTeacher = await this.teacherDALs.createTeacher({name, department, contact, userId, enrollment, subject});

    return createTeacher;
    
    
  }
}

export { TeacherServices };
