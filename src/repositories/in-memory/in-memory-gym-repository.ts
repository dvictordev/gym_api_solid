import { Gym, Prisma } from "@prisma/client";

import { GymRepositoryInterface } from "../gym-repository";
import { Decimal } from "@prisma/client/runtime/library";

export class InMemoryGymRepository implements GymRepositoryInterface {
  public items: any[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      id: data.id ?? "gym-01",
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
}
