import { Op } from "sequelize";
import { ControlMonitoringEvent } from "../domain.layer/models/controlMonitoringEvent/controlMonitoringEvent.model";
import { Control } from "../domain.layer/models/control/control.model";
import { User } from "../domain.layer/models/user/user.model";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";

export class ControlMonitoringService {
  async findEventsByControl(controlId: string, organizationId: string) {
    return ControlMonitoringEvent.findAll({
      where: { controlId, organizationId },
      include: [
        { model: User, as: "executedBy", attributes: ["id", "firstName", "lastName"] },
      ],
      order: [["executedAt", "DESC"]],
    });
  }

  async recordEvent(
    data: {
      controlId: string;
      status: string;
      notes?: string;
      evidence?: string;
    },
    organizationId: string,
    userId: string
  ) {
    const control = await Control.findOne({ where: { id: data.controlId, organizationId } });
    if (!control) throw new Error("Control not found");

    const event = await ControlMonitoringEvent.create({
      ...data,
      organizationId,
      executedById: userId,
      executedAt: new Date(),
    });

    // Update control monitoring status
    const now = new Date();
    if (data.status === "pass") {
      await control.update({
        monitoringStatus: "healthy",
        lastMonitoredAt: now,
        consecutiveFailures: 0,
      });
    } else if (data.status === "fail") {
      const newFailures = (control.consecutiveFailures || 0) + 1;
      await control.update({
        monitoringStatus: newFailures >= 3 ? "failing" : "at_risk",
        lastMonitoredAt: now,
        consecutiveFailures: newFailures,
      });
    } else {
      // error or skipped - just update lastMonitoredAt
      await control.update({ lastMonitoredAt: now });
    }

    await auditService.log({
      organizationId,
      userId,
      entityType: "control_monitoring_event",
      entityId: event.id,
      action: AuditAction.CREATE,
      changes: { controlId: data.controlId, status: data.status },
    });

    return event;
  }

  async getDashboard(organizationId: string) {
    const controls = await Control.findAll({
      where: { organizationId },
      attributes: ["id", "title", "monitoringStatus", "lastMonitoredAt", "nextTestDue", "consecutiveFailures"],
    });

    const counts = { healthy: 0, at_risk: 0, failing: 0, not_monitored: 0, overdue: 0 };
    const now = new Date();

    for (const c of controls) {
      const status = c.monitoringStatus || "not_monitored";
      if (status in counts) counts[status as keyof typeof counts]++;
      if (c.nextTestDue && new Date(c.nextTestDue) < now) counts.overdue++;
    }

    return { counts, total: controls.length };
  }

  async getOverdueControls(organizationId: string) {
    const now = new Date().toISOString().split("T")[0];
    return Control.findAll({
      where: {
        organizationId,
        nextTestDue: { [Op.lt]: now },
      },
      order: [["nextTestDue", "ASC"]],
    });
  }

  async getFailingControls(organizationId: string) {
    return Control.findAll({
      where: {
        organizationId,
        monitoringStatus: { [Op.in]: ["failing", "at_risk"] },
      },
      order: [["consecutiveFailures", "DESC"]],
    });
  }
}

export const controlMonitoringService = new ControlMonitoringService();
