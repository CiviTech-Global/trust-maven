import { Op, WhereOptions } from "sequelize";
import { Vendor } from "../domain.layer/models/vendor/vendor.model";
import { VendorAssessment } from "../domain.layer/models/vendorAssessment/vendorAssessment.model";
import { User } from "../domain.layer/models/user/user.model";
import { auditService } from "./audit.service";
import { AuditAction } from "../types";

export class VendorService {
  async findAll(
    organizationId: string,
    filters?: { riskLevel?: string; status?: string; search?: string }
  ) {
    const where: WhereOptions = { organizationId } as any;

    if (filters?.riskLevel) (where as any).riskLevel = filters.riskLevel;
    if (filters?.status) (where as any).status = filters.status;
    if (filters?.search) {
      (where as any).name = { [Op.iLike]: `%${filters.search}%` };
    }

    return Vendor.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });
  }

  async findById(id: string, organizationId: string) {
    const vendor = await Vendor.findOne({ where: { id, organizationId } });
    if (!vendor) throw new Error("Vendor not found");
    return vendor;
  }

  async create(
    data: { name: string; description?: string; riskLevel?: string; contactInfo?: Record<string, unknown>; status?: string },
    organizationId: string,
    userId: string
  ) {
    const vendor = await Vendor.create({ ...data, organizationId });

    await auditService.log({
      organizationId,
      userId,
      entityType: "vendor",
      entityId: vendor.id,
      action: AuditAction.CREATE,
      changes: data,
    });

    return vendor;
  }

  async update(
    id: string,
    data: Partial<{ name: string; description: string; riskLevel: string; contactInfo: Record<string, unknown>; status: string }>,
    organizationId: string,
    userId: string
  ) {
    const vendor = await Vendor.findOne({ where: { id, organizationId } });
    if (!vendor) throw new Error("Vendor not found");

    await vendor.update(data);

    await auditService.log({
      organizationId,
      userId,
      entityType: "vendor",
      entityId: vendor.id,
      action: AuditAction.UPDATE,
      changes: data,
    });

    return vendor;
  }

  async delete(id: string, organizationId: string, userId: string) {
    const vendor = await Vendor.findOne({ where: { id, organizationId } });
    if (!vendor) throw new Error("Vendor not found");

    await VendorAssessment.destroy({ where: { vendorId: id } });
    await vendor.destroy();

    await auditService.log({
      organizationId,
      userId,
      entityType: "vendor",
      entityId: id,
      action: AuditAction.DELETE,
    });
  }

  // Assessments
  async getAssessments(vendorId: string, organizationId: string) {
    return VendorAssessment.findAll({
      where: { vendorId, organizationId },
      include: [{ model: User, as: "assessor", attributes: ["id", "firstName", "lastName"] }],
      order: [["createdAt", "DESC"]],
    });
  }

  async createAssessment(
    data: {
      vendorId: string;
      title: string;
      assessmentType: string;
      questionnaire?: { question: string; answer: string; score?: number; notes?: string }[];
      findings?: { severity: string; description: string; recommendation: string }[];
      summary?: string;
      riskRating?: string;
      score?: number;
      nextReviewDate?: string;
    },
    organizationId: string,
    userId: string
  ) {
    const vendor = await Vendor.findOne({ where: { id: data.vendorId, organizationId } });
    if (!vendor) throw new Error("Vendor not found");

    const assessment = await VendorAssessment.create({
      ...data,
      organizationId,
      assessorId: userId,
      assessedAt: new Date().toISOString().split("T")[0],
      status: "completed",
    });

    // Update vendor risk level based on assessment
    if (data.riskRating) {
      await vendor.update({ riskLevel: data.riskRating });
    }

    await auditService.log({
      organizationId,
      userId,
      entityType: "vendor_assessment",
      entityId: assessment.id,
      action: AuditAction.CREATE,
      changes: { vendorId: data.vendorId, assessmentType: data.assessmentType, riskRating: data.riskRating },
    });

    return assessment;
  }

  async deleteAssessment(assessmentId: string, organizationId: string, userId: string) {
    const assessment = await VendorAssessment.findOne({ where: { id: assessmentId, organizationId } });
    if (!assessment) throw new Error("Assessment not found");

    await assessment.destroy();

    await auditService.log({
      organizationId,
      userId,
      entityType: "vendor_assessment",
      entityId: assessmentId,
      action: AuditAction.DELETE,
    });
  }
}

export const vendorService = new VendorService();
