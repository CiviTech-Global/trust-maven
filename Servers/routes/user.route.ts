import { Router } from "express";
import { authenticate, authorize, tenantIsolation } from "../middleware/auth.middleware";
import { UserRole } from "../types";
import { userController } from "../controllers/user.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/", authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN), (req, res) => userController.findAll(req, res));
router.post("/", authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN), (req, res) => userController.create(req, res));
router.get("/:id", (req, res) => userController.findById(req, res));
router.put("/:id", (req, res) => userController.update(req, res));
router.put("/:id/role", authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN), (req, res) => userController.updateRole(req, res));
router.put("/:id/activate", authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN), (req, res) => userController.activate(req, res));
router.delete("/:id", authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN), (req, res) => userController.deactivate(req, res));

export default router;
