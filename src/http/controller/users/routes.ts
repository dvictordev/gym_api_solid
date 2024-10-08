import { FastifyInstance } from "fastify";
import { registerController } from "./register.controller";
import { authenticateController } from "./authenticate.controller";
import { profileController } from "./profile.controller";
import { verifyJwt } from "../../middlewares/verifyJwt";
import { refreshController } from "./refresh.controller";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/login", authenticateController);
  app.post("/users", registerController);
  app.patch("/token/refresh", refreshController);

  // Authenticated routes
  app.get("/me", { onRequest: [verifyJwt] }, profileController);
}
