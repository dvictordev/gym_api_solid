import { Gym, Prisma, User } from "@prisma/client";

export interface GymRepositoryInterface {
  findById(id: string): Promise<Gym | null>;
  create(gym: Prisma.GymCreateInput): Promise<Gym>;
}
