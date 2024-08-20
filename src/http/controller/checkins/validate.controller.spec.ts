import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Validate Checkin (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to validate a checkin", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        name: "Javascript Gym",
        phone: "1199999999",
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    });

    let checkin = await prisma.checkin.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    });

    const response = await request(app.server)
      .patch(`/check-ins/${checkin.id}/validate`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);

    checkin = await prisma.checkin.findUniqueOrThrow({
      where: {
        id: checkin.id,
      },
    });

    expect(checkin.validated_at).toEqual(expect.any(Date));
  });
});
