import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { trustCenterController } from "../controllers/trustCenter.ctrl";

const publicRouter = Router();
const protectedRouter = Router();

publicRouter.get("/public/:orgId", (req, res) => trustCenterController.getPublicPage(req, res));

protectedRouter.use(authenticate, tenantIsolation);
protectedRouter.get("/config", (req, res) => trustCenterController.getConfig(req, res));
protectedRouter.put("/config", (req, res) => trustCenterController.updateConfig(req, res));
protectedRouter.post("/toggle", (req, res) => trustCenterController.toggleVisibility(req, res));

export { publicRouter as trustCenterPublicRoutes, protectedRouter as trustCenterProtectedRoutes };
export default protectedRouter;
