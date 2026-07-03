import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { Organization } from "../domain.layer/models/organization/organization.model";
import { controllerWrapper } from "../utils/controllerWrapper";
import { NotFoundException } from "../domain.layer/exceptions/custom.exception";

export class OrganizationController {
  getMyOrg = controllerWrapper(
    async (req) => {
      const org = await Organization.findByPk(req.user!.organizationId, {
        attributes: ["id", "name", "slug", "settings", "createdAt", "updatedAt"],
      });
      if (!org) throw new NotFoundException("Organization not found");
      return { status: 200, data: org };
    },
    { functionName: "getMyOrg", eventType: "Read" }
  );

  updateMyOrg = controllerWrapper(
    async (req) => {
      const { name, settings } = req.body;
      const org = await Organization.findByPk(req.user!.organizationId);
      if (!org) throw new NotFoundException("Organization not found");
      if (name) org.name = name;
      if (settings) org.settings = { ...org.settings, ...settings };
      await org.save();
      return { status: 200, data: org };
    },
    { functionName: "updateMyOrg", eventType: "Update" }
  );
}

export const organizationController = new OrganizationController();
