import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { Organization } from "../domain.layer/models/organization/organization.model";

export class OrganizationController {
  async getMyOrg(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const org = await Organization.findByPk(req.user!.organizationId, {
        attributes: ["id", "name", "slug", "settings", "createdAt", "updatedAt"],
      });
      if (!org) {
        res.status(404).json({ success: false, message: "Organization not found" });
        return;
      }
      res.json({ success: true, data: org });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateMyOrg(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { name, settings } = req.body;
      const org = await Organization.findByPk(req.user!.organizationId);
      if (!org) {
        res.status(404).json({ success: false, message: "Organization not found" });
        return;
      }
      if (name) org.name = name;
      if (settings) org.settings = { ...org.settings, ...settings };
      await org.save();
      res.json({ success: true, data: org });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export const organizationController = new OrganizationController();
