import { Checkin, Prisma } from "@prisma/client";

export interface CheckInRepositoryInterface {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin | null>;
  findByUserIdOnDate(id: string, date: Date): Promise<Checkin | null>;
  findManyCheckinsByUser(id: string, page: number): Promise<Checkin[]>;
  counterByUserId(id: string): Promise<number>;
  findById(id: String): Promise<Checkin | null>;
  save(checkin: Checkin): Promise<Checkin>;
}
