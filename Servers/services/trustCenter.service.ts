import { TrustCenter } from "../domain.layer/models/trustCenter/trustCenter.model";

export class TrustCenterService {
  async getConfig(orgId: string) {
    let config = await TrustCenter.findOne({ where: { organizationId: orgId } });
    if (!config) {
      config = await TrustCenter.create({
        organizationId: orgId,
        isPublic: false,
      });
    }
    return config;
  }

  async updateConfig(orgId: string, data: Partial<{
    isPublic: boolean;
    companyName: string;
    companyLogo: string;
    description: string;
    supportEmail: string;
    supportUrl: string;
    certifications: unknown[];
    controls: unknown[];
    customSections: Record<string, unknown>[];
  }>) {
    const config = await this.getConfig(orgId);

    const changedFields: Record<string, unknown> = {};
    if (data.isPublic !== undefined) changedFields.isPublic = data.isPublic;
    if (data.companyName !== undefined) changedFields.companyName = data.companyName;
    if (data.companyLogo !== undefined) changedFields.companyLogo = data.companyLogo;
    if (data.description !== undefined) changedFields.description = data.description;
    if (data.supportEmail !== undefined) changedFields.supportEmail = data.supportEmail;
    if (data.supportUrl !== undefined) changedFields.supportUrl = data.supportUrl;
    if (data.certifications !== undefined) changedFields.certifications = data.certifications;
    if (data.controls !== undefined) changedFields.controls = data.controls;
    if (data.customSections !== undefined) changedFields.customSections = data.customSections;

    await config.update(changedFields);
    return config;
  }

  async getPublicPage(orgId: string) {
    const config = await TrustCenter.findOne({ where: { organizationId: orgId, isPublic: true } });
    if (!config) throw new Error("Trust center is not public or not found");

    return {
      companyName: config.companyName,
      companyLogo: config.companyLogo,
      description: config.description,
      supportEmail: config.supportEmail,
      supportUrl: config.supportUrl,
      certifications: config.certifications,
      controls: config.controls,
      customSections: config.customSections,
    };
  }

  async toggleVisibility(orgId: string) {
    const config = await this.getConfig(orgId);
    await config.update({ isPublic: !config.isPublic });
    return config;
  }
}

export const trustCenterService = new TrustCenterService();
