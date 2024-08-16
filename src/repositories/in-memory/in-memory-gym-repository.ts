import { Gym, Prisma } from "@prisma/client";

import { FindManyNearGyms, GymRepositoryInterface } from "../gym-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { randomUUID } from "crypto";

export class InMemoryGymRepository implements GymRepositoryInterface {
  public items: Gym[] = [];

  async searchMany(
    name: string,
    page: number
  ): Promise<
    {
      id: string;
      name: string;
      description: string | null;
      phone: string;
      latitude: Prisma.Decimal;
      longitude: Prisma.Decimal;
    }[]
  > {
    return this.items
      .filter((item) => item.name.includes(name))
      .slice((page - 1) * 20, page * 20);
  }

  async create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      description: data.description ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      name: data.name,
      phone: data.phone ?? null,
    };
    this.items.push(gym);

    return gym;
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
  async findManyNearGyms({ latitude, longitude }: FindManyNearGyms) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        }
      );

      return distance < 10;
    });
  }
}
