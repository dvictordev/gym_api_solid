import { Prisma, User } from "@prisma/client";

export interface UsersRepositoryInterface {
  findById(id: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User | null>;
  findByEmail(emails: string): Promise<User | null>;
}
