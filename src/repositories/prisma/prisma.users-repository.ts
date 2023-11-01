import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepositoryInterface } from '../users-interface.repository'


export class PrismaUsersRepository implements UsersRepositoryInterface {

  async findByEmail(email: string){
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

   return user
  }


  async create(data: Prisma.UserCreateInput) {
   
    const user = await prisma.user.create({
      data,
    })

    return user
  }

}
