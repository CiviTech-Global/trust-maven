import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { trustCenterService } from "../services/trustCenter.service";
import { controllerWrapper } from "../utils/controllerWrapper";

export class TrustCenterController {
  getConfig = controllerWrapper(
    async (req) => {
      const config = await trustCenterService.getConfig(req.user!.organizationId);
      return { status: 200, data: config };
    },
    { functionName: "getConfig", eventType: "Read" }
  );

  updateConfig = controllerWrapper(
    async (req) => {
      const config = await trustCenterService.updateConfig(req.user!.organizationId, req.body);
      return { status: 200, data: config };
    },
    { functionName: "updateConfig", eventType: "Update" }
  );

  toggleVisibility = controllerWrapper(
    async (req) => {
      const config = await trustCenterService.toggleVisibility(req.user!.organizationId);
      return { status: 200, data: config };
    },
    { functionName: "toggleVisibility", eventType: "Update" }
  );

  // getPublicPage is a public endpoint that doesn't require authentication
  async getPublicPage(req: Request, res: Response): Promise<void> {
    try {
      const config = await trustCenterService.getPublicPage(req.params.orgId as string);
      res.json({ success: true, data: config });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}

export const trustCenterController = new TrustCenterController();
