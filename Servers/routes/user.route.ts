import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { UserRole } from "../types";

const router = Router();

router.use(authenticate);

router.get("/", authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN), (_req, res) => {
  res.json({ success: true, data: [], message: "User list - to be implemented" });
});

router.get("/:id", (_req, res) => {
  res.json({ success: true, data: null, message: "User detail - to be implemented" });
});

router.put("/:id", (_req, res) => {
  res.json({ success: true, message: "User update - to be implemented" });
});

router.delete("/:id", authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN), (_req, res) => {
  res.json({ success: true, message: "User delete - to be implemented" });
});

export default router;
