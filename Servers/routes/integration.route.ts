import { Router } from "express";
import { authenticate, tenantIsolation } from "../middleware/auth.middleware";
import { integrationController } from "../controllers/integration.ctrl";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/available", (req, res) => integrationController.getAvailableConnectors(req, res));
router.get("/marketplace", (req, res) => integrationController.getMarketplace(req, res));
router.get("/dashboard/summary", (req, res) => integrationController.getDashboardSummary(req, res));
router.get("/", (req, res) => integrationController.findAll(req, res));
router.post("/", (req, res) => integrationController.create(req, res));
router.get("/:id", (req, res) => integrationController.findById(req, res));
router.put("/:id", (req, res) => integrationController.update(req, res));
router.delete("/:id", (req, res) => integrationController.delete(req, res));
router.post("/:id/test", (req, res) => integrationController.testConnection(req, res));
router.post("/:id/sync", (req, res) => integrationController.syncNow(req, res));
router.get("/:id/history", (req, res) => integrationController.getSyncHistory(req, res));

export default router;
