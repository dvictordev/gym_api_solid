import { Checkin, Prisma } from "@prisma/client";

export interface CheckInRepositoryInterface {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin | null>;
  findByUserIdOnDate(id: string, date: Date): Promise<Checkin | null>;
}
