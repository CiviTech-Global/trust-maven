import { Router, Response } from "express";
import { authenticate, tenantIsolation, AuthenticatedRequest } from "../middleware/auth.middleware";
import { demoDataService } from "../services/demoData.service";

const router = Router();

router.use(authenticate, tenantIsolation);

router.get("/status", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const hasDemoData = await demoDataService.hasDemoData(req.user!.organizationId);
    res.json({ success: true, data: { hasDemoData } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const hasDemoData = await demoDataService.hasDemoData(req.user!.organizationId);
    if (hasDemoData) {
      res.status(400).json({ success: false, message: "Demo data already exists" });
      return;
    }
    const result = await demoDataService.createDemoData(req.user!.organizationId, req.user!.userId);
    res.status(201).json({ success: true, data: result, message: "Demo data created successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    await demoDataService.deleteDemoData(req.user!.organizationId);
    res.json({ success: true, message: "Demo data cleared successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
