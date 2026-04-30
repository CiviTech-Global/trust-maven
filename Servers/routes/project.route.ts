import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/", (_req, res) => {
  res.json({ success: true, data: [], message: "Project list - to be implemented" });
});

router.post("/", (_req, res) => {
  res.status(201).json({ success: true, message: "Project create - to be implemented" });
});

router.get("/:id", (_req, res) => {
  res.json({ success: true, data: null, message: "Project detail - to be implemented" });
});

router.put("/:id", (_req, res) => {
  res.json({ success: true, message: "Project update - to be implemented" });
});

router.delete("/:id", (_req, res) => {
  res.json({ success: true, message: "Project delete - to be implemented" });
});

export default router;
