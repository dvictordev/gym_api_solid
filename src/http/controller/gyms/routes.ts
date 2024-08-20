import { FastifyInstance } from "fastify";

import { verifyJwt } from "../../middlewares/verifyJwt";
import { createGymController } from "./create.controller";
import { searchGymController } from "./search.controller";
import { nearByGymController } from "./nearby.controller";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.get("/gym/search", searchGymController);
  app.get("/gym/nearby", nearByGymController);

  app.post(
    "/gyms",
    { onRequest: [verifyUserRole("ADMIN")] },
    createGymController
  );
}
