import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Nearby Gyms (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search a nearby gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "javascript gym",
        description: "some description",
        phone: "1199999999",
        latitude: -29.9881335,
        longitude: -52.3719842,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "typescript gym",
        description: "some description",
        phone: "1199999999",
        latitude: -30.5450388,
        longitude: -52.5146816,
      });

    const response = await request(app.server)
      .get("/gym/nearby")
      .query({
        latitude: -29.9881335,
        longitude: -52.3719842,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: "javascript gym",
      }),
    ]);
  });
});
