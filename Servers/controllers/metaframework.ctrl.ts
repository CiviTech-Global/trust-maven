import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { metaframeworkService } from "../services/metaframework.service";
import { workflowEngineService } from "../services/workflowEngine.service";
import { controllerWrapper } from "../utils/controllerWrapper";

const VALID_META_TRANSITIONS: Record<string, string[]> = {
  not_started: ["draft"],
  draft: ["in_progress"],
  in_progress: ["awaiting_review"],
  awaiting_review: ["awaiting_approval", "needs_rework"],
  awaiting_approval: ["implemented", "needs_rework"],
  needs_rework: ["in_progress", "draft"],
  implemented: [],
  not_applicable: [],
};

function qs(val: unknown): string | undefined {
  if (typeof val === "string") return val;
  if (Array.isArray(val) && val.length > 0) return String(val[0]);
  return undefined;
}

export class MetaframeworkController {
  async getAllowedTransitions(currentStatus: string, organizationId?: string): Promise<string[]> {
    if (organizationId) {
      const workflow = await workflowEngineService.getWorkflow(organizationId, "common_control_implementation");
      if (workflow) {
        return workflow.transitions
          .filter((t) => t.from === currentStatus)
          .map((t) => t.to);
      }
    }
    const transitions = VALID_META_TRANSITIONS[currentStatus] || [];
    if (currentStatus !== "implemented" && currentStatus !== "not_applicable") {
      return [...transitions, "not_applicable"];
    }
    return transitions;
  }

  getWorkflowStatus = controllerWrapper(
    async (req) => {
      const currentStatus = qs(req.query.currentStatus) || "";
      const allowedTransitions = await this.getAllowedTransitions(currentStatus, req.user!.organizationId);
      return { status: 200, data: { currentStatus, allowedTransitions } };
    },
    { functionName: "getWorkflowStatus", eventType: "Read" }
  );

  listCommonControls = controllerWrapper(
    async (req) => {
      const controls = await metaframeworkService.listCommonControls({
        domain: qs(req.query.domain),
        search: qs(req.query.search),
        weight: qs(req.query.weight),
      });
      return { status: 200, data: controls };
    },
    { functionName: "listCommonControls", eventType: "Read" }
  );

  getCommonControl = controllerWrapper(
    async (req) => {
      const control = await metaframeworkService.getCommonControl(String(req.params.id));
      return { status: 200, data: control };
    },
    { functionName: "getCommonControl", eventType: "Read" }
  );

  listDomains = controllerWrapper(
    async (_req) => {
      const domains = await metaframeworkService.listDomains();
      return { status: 200, data: domains };
    },
    { functionName: "listDomains", eventType: "Read" }
  );

  getMappingsForRequirement = controllerWrapper(
    async (req) => {
      const mappings = await metaframeworkService.getMappingsForRequirement(String(req.params.requirementId));
      return { status: 200, data: mappings };
    },
    { functionName: "getMappingsForRequirement", eventType: "Read" }
  );

  getMappingsForControl = controllerWrapper(
    async (req) => {
      const mappings = await metaframeworkService.getMappingsForControl(String(req.params.controlId));
      return { status: 200, data: mappings };
    },
    { functionName: "getMappingsForControl", eventType: "Read" }
  );

  getImplementations = controllerWrapper(
    async (req) => {
      const result = await metaframeworkService.getOrganizationImplementations(
        req.user!.organizationId,
        { status: qs(req.query.status), domain: qs(req.query.domain) }
      );
      return { status: 200, data: result };
    },
    { functionName: "getImplementations", eventType: "Read" }
  );

  updateImplementation = controllerWrapper(
    async (req) => {
      const impl = await metaframeworkService.updateImplementation(
        req.user!.organizationId,
        String(req.params.controlId),
        req.body,
        req.user!.userId
      );
      return { status: 200, data: impl };
    },
    { functionName: "updateImplementation", eventType: "Update" }
  );

  getJumpstartCoverage = controllerWrapper(
    async (req) => {
      const coverage = await metaframeworkService.getJumpstartCoverage(
        req.user!.organizationId,
        String(req.params.regulationId)
      );
      return { status: 200, data: coverage };
    },
    { functionName: "getJumpstartCoverage", eventType: "Read" }
  );

  getUnifiedCompliance = controllerWrapper(
    async (req) => {
      const status = await metaframeworkService.getUnifiedComplianceStatus(
        req.user!.organizationId
      );
      return { status: 200, data: status };
    },
    { functionName: "getUnifiedCompliance", eventType: "Read" }
  );
}

export const metaframeworkController = new MetaframeworkController();
