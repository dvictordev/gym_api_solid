import { FastifyInstance } from "fastify";

import { verifyJwt } from "../../middlewares/verifyJwt";
import { createGymController } from "./create.controller";
import { searchGymController } from "./search.controller";
import { nearByGymController } from "./nearby.controller";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.get("/gym/search", searchGymController);
  app.get("/gym/nearby", nearByGymController);

  app.post("/gyms", createGymController);
}
