import { FastifyInstance } from "fastify";
import { registerController } from "./controller/register.controller";
import { authenticateController } from "./controller/authenticate.controller";
import { profileController } from "./controller/profile.controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/login", authenticateController);
  app.post("/users", registerController);

  // Authenticated routes
  app.get("/me", profileController);
}
