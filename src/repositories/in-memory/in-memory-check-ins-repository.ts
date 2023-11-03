import { Checkin, Prisma } from "@prisma/client";
import { CheckInRepositoryInterface } from "../checkin-inteface.repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInRepositoryInterface {
  public items: Checkin[] = [];

  async findByUserIdOnDate(user_id: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkInOnSameDate = this.items.find((checkin) => {
      const checkinDate = dayjs(checkin.created_at);
      const isOnsameDate =
        checkinDate.isAfter(startOfTheDay) && checkinDate.isBefore(endOfTheDay);

      return checkin.user_id === user_id && isOnsameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async create(data: Prisma.CheckinUncheckedCreateInput) {
    const checkin = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    };

    this.items.push(checkin);

    return checkin;
  }

  async findManyCheckinsByUser(id: string, page: number) {
    return this.items
      .filter((item) => item.user_id === id)
      .slice((page - 1) * 20, page * 20);
  }
}
