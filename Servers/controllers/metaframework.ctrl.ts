import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { metaframeworkService } from "../services/metaframework.service";
import { workflowEngineService } from "../services/workflowEngine.service";

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

function ensureUser(req: AuthenticatedRequest) {
  if (!req.user) throw new Error("Authentication required");
  return req.user;
}

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

  async getWorkflowStatus(req: AuthenticatedRequest, res: Response) {
    const currentStatus = qs(req.query.currentStatus) || "";
    const user = ensureUser(req);
    const allowedTransitions = await this.getAllowedTransitions(currentStatus, user.organizationId);
    res.json({ currentStatus, allowedTransitions });
  }

  async listCommonControls(req: AuthenticatedRequest, res: Response) {
    const controls = await metaframeworkService.listCommonControls({
      domain: qs(req.query.domain),
      search: qs(req.query.search),
      weight: qs(req.query.weight),
    });
    res.json(controls);
  }

  async getCommonControl(req: AuthenticatedRequest, res: Response) {
    const control = await metaframeworkService.getCommonControl(
      String(req.params.id)
    );
    res.json(control);
  }

  async listDomains(req: AuthenticatedRequest, res: Response) {
    const domains = await metaframeworkService.listDomains();
    res.json(domains);
  }

  async getMappingsForRequirement(req: AuthenticatedRequest, res: Response) {
    const mappings = await metaframeworkService.getMappingsForRequirement(
      String(req.params.requirementId)
    );
    res.json(mappings);
  }

  async getMappingsForControl(req: AuthenticatedRequest, res: Response) {
    const mappings = await metaframeworkService.getMappingsForControl(
      String(req.params.controlId)
    );
    res.json(mappings);
  }

  async getImplementations(req: AuthenticatedRequest, res: Response) {
    const user = ensureUser(req);
    const result = await metaframeworkService.getOrganizationImplementations(
      user.organizationId,
      { status: qs(req.query.status), domain: qs(req.query.domain) }
    );
    res.json(result);
  }

  async updateImplementation(req: AuthenticatedRequest, res: Response) {
    const user = ensureUser(req);
    const impl = await metaframeworkService.updateImplementation(
      user.organizationId,
      String(req.params.controlId),
      req.body,
      user.userId
    );
    res.json(impl);
  }

  async getJumpstartCoverage(req: AuthenticatedRequest, res: Response) {
    const user = ensureUser(req);
    const coverage = await metaframeworkService.getJumpstartCoverage(
      user.organizationId,
      String(req.params.regulationId)
    );
    res.json(coverage);
  }

  async getUnifiedCompliance(req: AuthenticatedRequest, res: Response) {
    const user = ensureUser(req);
    const status = await metaframeworkService.getUnifiedComplianceStatus(
      user.organizationId
    );
    res.json(status);
  }
}

export const metaframeworkController = new MetaframeworkController();
