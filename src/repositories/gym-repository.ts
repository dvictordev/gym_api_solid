import { Gym, Prisma } from "@prisma/client";

export interface FindManyNearGyms {
  latitude: number;
  longitude: number;
}

export interface GymRepositoryInterface {
  findById(id: string): Promise<Gym | null>;
  create(gym: Prisma.GymCreateInput): Promise<Gym>;
  searchMany(name: string, page: number): Promise<Gym[]>;
  findManyNearGyms({ latitude, longitude }: FindManyNearGyms): Promise<Gym[]>;
}
