import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Search Gyms (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search a gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "javascript gym",
        description: "some description",
        phone: "1199999999",
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "typescript gym",
        description: "some description",
        phone: "1199999999",
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    const response = await request(app.server)
      .get("/gym/search")
      .query({
        q: "javascript",
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
