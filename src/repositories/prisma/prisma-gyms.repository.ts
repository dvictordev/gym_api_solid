import { prisma } from "@/lib/prisma";
import { Gym, Prisma } from "@prisma/client";
import { FindManyNearGyms, GymRepositoryInterface } from "../gym-repository";

export class PrismaGymsRepository implements GymRepositoryInterface {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    });

    return gym;
  }
  async searchMany(name: string, page: number) {
    const gym = await prisma.gym.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gym;
  }
  async findManyNearGyms({ latitude, longitude }: FindManyNearGyms) {
    const gyms = await prisma.$queryRaw<Gym[]>`
    SELECT * FROM gyms
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }
}
