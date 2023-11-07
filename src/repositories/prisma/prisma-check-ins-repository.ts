import { prisma } from "@/lib/prisma";
import { Prisma, Checkin } from "@prisma/client";
import { UsersRepositoryInterface } from "../users-interface.repository";
import { CheckInRepositoryInterface } from "../checkin-inteface.repository";
import dayjs from "dayjs";

export class PrismaChekinRepository implements CheckInRepositoryInterface {
  async create(data: Prisma.CheckinUncheckedCreateInput) {
    const checkin = await prisma.checkin.create({
      data,
    });

    return checkin;
  }

  async findByUserIdOnDate(id: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");
    const checkinsByUserIdOnDate = await prisma.checkin.findFirst({
      where: {
        user_id: id,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkinsByUserIdOnDate;
  }
  async findManyCheckinsByUser(id: string, page: number) {
    const checkIns = prisma.checkin.findMany({
      where: {
        user_id: id,
      },
      skip: page,
      take: (page - 1) * 20,
    });

    return checkIns;
  }
  async counterByUserId(id: string) {
    const checkinCountByUserId = await prisma.checkin.count({
      where: {
        user_id: id,
      },
    });

    return checkinCountByUserId;
  }
  async findById(id: string) {
    const checkin = await prisma.checkin.findUnique({
      where: {
        id,
      },
    });

    return checkin;
  }
  async save(data: Checkin) {
    const checkIn = await prisma.checkin.update({
      where: {
        id: data.id,
      },
      data,
    });

    return checkIn;
  }
}
