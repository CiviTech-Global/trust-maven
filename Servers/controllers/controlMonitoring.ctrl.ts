import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { controlMonitoringService } from "../services/controlMonitoring.service";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ValidationException } from "../domain.layer/exceptions/custom.exception";

export class ControlMonitoringController {
  findEventsByControl = controllerWrapper(
    async (req) => {
      const events = await controlMonitoringService.findEventsByControl(req.params.id as string, req.user!.organizationId);
      return { status: 200, data: events };
    },
    { functionName: "findEventsByControl", eventType: "Read" }
  );

  recordEvent = controllerWrapper(
    async (req) => {
      const { status, notes, evidence } = req.body;
      if (!status) throw new ValidationException("Status is required");
      const event = await controlMonitoringService.recordEvent(
        { controlId: req.params.id as string, status, notes, evidence },
        req.user!.organizationId,
        req.user!.userId
      );
      return { status: 201, data: event };
    },
    { functionName: "recordEvent", eventType: "Create" }
  );

  getDashboard = controllerWrapper(
    async (req) => {
      const dashboard = await controlMonitoringService.getDashboard(req.user!.organizationId);
      return { status: 200, data: dashboard };
    },
    { functionName: "getDashboard", eventType: "Read" }
  );

  getOverdue = controllerWrapper(
    async (req) => {
      const controls = await controlMonitoringService.getOverdueControls(req.user!.organizationId);
      return { status: 200, data: controls };
    },
    { functionName: "getOverdue", eventType: "Read" }
  );

  getFailing = controllerWrapper(
    async (req) => {
      const controls = await controlMonitoringService.getFailingControls(req.user!.organizationId);
      return { status: 200, data: controls };
    },
    { functionName: "getFailing", eventType: "Read" }
  );
}

export const controlMonitoringController = new ControlMonitoringController();
