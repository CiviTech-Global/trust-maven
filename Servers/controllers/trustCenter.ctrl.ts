import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { trustCenterService } from "../services/trustCenter.service";

function ensureUser(req: AuthenticatedRequest) {
  if (!req.user) throw new Error("Authentication required");
  return req.user;
}

export class TrustCenterController {
  async getConfig(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const config = await trustCenterService.getConfig(user.organizationId);
      res.json({ success: true, data: config });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateConfig(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const config = await trustCenterService.updateConfig(user.organizationId, req.body);
      res.json({ success: true, data: config });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async toggleVisibility(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = ensureUser(req);
      const config = await trustCenterService.toggleVisibility(user.organizationId);
      res.json({ success: true, data: config });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

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
