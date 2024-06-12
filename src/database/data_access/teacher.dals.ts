import { prisma } from "../prisma.databases";
import { ITeacherCreate } from "../../interfaces/teacher.interface";
class TeacherDALs {
  constructor() {}
  async createTeacher({
    name,
    department,
    contact,
    userId,
    enrollment,
    subject,
  }: ITeacherCreate) {
    const result = await prisma.teacher.create({
      data: {
        name,
        department,
        contact,
        userId,
        enrollment,
        subject,
      },
    });

    return result;
  }

  async findTeacherByEnrollment(enrollment: string){
    const result = await prisma.teacher.findUnique({
      where:{enrollment},
    })
    return result;
  }
}

export { TeacherDALs };
