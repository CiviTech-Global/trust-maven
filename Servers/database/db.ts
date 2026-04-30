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

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_NAME || "trustmaven",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
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
  ],
  pool: {
    max: 20,
    min: 5,
    acquire: 30000,
    idle: 10000,
  },
});
