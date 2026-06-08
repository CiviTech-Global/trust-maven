import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { Organization } from "../domain.layer/models/organization/organization.model";
import { User } from "../domain.layer/models/user/user.model";
import { Role } from "../domain.layer/models/role/role.model";
import { Project } from "../domain.layer/models/project/project.model";
import { Risk } from "../domain.layer/models/risk/risk.model";
import { RiskAssessment } from "../domain.layer/models/riskAssessment/riskAssessment.model";
import { RiskTreatment } from "../domain.layer/models/riskTreatment/riskTreatment.model";
import { Control } from "../domain.layer/models/control/control.model";
import { AuditLog } from "../domain.layer/models/auditLog/auditLog.model";
import { Framework } from "../domain.layer/models/framework/framework.model";
import { Vendor } from "../domain.layer/models/vendor/vendor.model";
import { Policy } from "../domain.layer/models/policy/policy.model";
import { Task } from "../domain.layer/models/task/task.model";
import { File } from "../domain.layer/models/file/file.model";
import { Notification } from "../domain.layer/models/notification/notification.model";
import { RiskControlMapping } from "../domain.layer/models/riskControlMapping/riskControlMapping.model";
import { ControlFrameworkMapping } from "../domain.layer/models/controlFrameworkMapping/controlFrameworkMapping.model";
import { KRI } from "../domain.layer/models/kri/kri.model";
import { VendorAssessment } from "../domain.layer/models/vendorAssessment/vendorAssessment.model";
import { RiskCategory } from "../domain.layer/models/riskCategory/riskCategory.model";
import { RiskQuantification } from "../domain.layer/models/riskQuantification/riskQuantification.model";
import { ControlMonitoringEvent } from "../domain.layer/models/controlMonitoringEvent/controlMonitoringEvent.model";
import { Audit } from "../domain.layer/models/audit/audit.model";
import { AuditFinding } from "../domain.layer/models/auditFinding/auditFinding.model";
import { ReportTemplate } from "../domain.layer/models/reportTemplate/reportTemplate.model";
import { RegulationDefinition } from "../domain.layer/models/regulationDefinition/regulationDefinition.model";
import { RegulationRequirement } from "../domain.layer/models/regulationRequirement/regulationRequirement.model";
import { CrossFrameworkMapping } from "../domain.layer/models/crossFrameworkMapping/crossFrameworkMapping.model";
import { OrganizationRegulation } from "../domain.layer/models/organizationRegulation/organizationRegulation.model";
import { RequirementImplementation } from "../domain.layer/models/requirementImplementation/requirementImplementation.model";
import { MfaSetting } from "../domain.layer/models/mfa/mfa.model";
import { KriHistory } from "../domain.layer/models/kriHistory/kriHistory.model";
import { Evidence } from "../domain.layer/models/evidence/evidence.model";
import { CommonControl } from "../domain.layer/models/commonControl/commonControl.model";
import { CommonControlMapping } from "../domain.layer/models/commonControlMapping/commonControlMapping.model";
import { CommonControlImplementation } from "../domain.layer/models/commonControlImplementation/commonControlImplementation.model";
import { Integration } from "../domain.layer/models/integration/integration.model";
import { IntegrationEvent } from "../domain.layer/models/integrationEvent/integrationEvent.model";
import { Entity } from "../domain.layer/models/entity/entity.model";
import { TrustCenter } from "../domain.layer/models/trustCenter/trustCenter.model";
import { FairAnalysis } from "../domain.layer/models/fairAnalysis/fairAnalysis.model";
import { WorkflowDefinition } from "../domain.layer/models/workflowDefinition/workflowDefinition.model";
import { WorkflowExecution } from "../domain.layer/models/workflowExecution/workflowExecution.model";

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_NAME || "trustmaven",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  dialect: "postgres",
  logging: process.env.DB_LOGGING === "true" ? console.log : false,
  models: [
    Organization,
    User,
    Role,
    Project,
    Risk,
    RiskAssessment,
    RiskTreatment,
    Control,
    AuditLog,
    Framework,
    Vendor,
    Policy,
    Task,
    File,
    Notification,
    RiskControlMapping,
    ControlFrameworkMapping,
    KRI,
    VendorAssessment,
    RiskCategory,
    RiskQuantification,
    ControlMonitoringEvent,
    Audit,
    AuditFinding,
    ReportTemplate,
    RegulationDefinition,
    RegulationRequirement,
    CrossFrameworkMapping,
    OrganizationRegulation,
    RequirementImplementation,
    MfaSetting,
    KriHistory,
    Evidence,
    CommonControl,
    CommonControlMapping,
    CommonControlImplementation,
    Integration,
    IntegrationEvent,
    Entity,
    TrustCenter,
    FairAnalysis,
    WorkflowDefinition,
    WorkflowExecution,
  ],
  pool: {
    max: 20,
    min: 5,
    acquire: 30000,
    idle: 10000,
  },
});
