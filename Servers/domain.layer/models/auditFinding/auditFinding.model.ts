import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  Default,
  PrimaryKey,
} from "sequelize-typescript";
import { Organization } from "../organization/organization.model";
import { Audit } from "../audit/audit.model";
import { User } from "../user/user.model";
import { Control } from "../control/control.model";
import { Risk } from "../risk/risk.model";

@Table({ tableName: "audit_findings", timestamps: true })
export class AuditFinding extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.UUID, allowNull: false })
  organizationId!: string;

  @ForeignKey(() => Audit)
  @Column({ type: DataType.UUID, allowNull: false })
  auditId!: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  title!: string;

  @Column({ type: DataType.TEXT })
  description!: string | null;

  @Column({
    type: DataType.ENUM("critical", "high", "medium", "low", "informational"),
    allowNull: false,
  })
  severity!: string;

  @Column({
    type: DataType.ENUM("open", "in_remediation", "remediated", "accepted", "closed"),
    defaultValue: "open",
  })
  status!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  responsibleId!: string | null;

  @ForeignKey(() => Control)
  @Column({ type: DataType.UUID })
  controlId!: string | null;

  @ForeignKey(() => Risk)
  @Column({ type: DataType.UUID })
  riskId!: string | null;

  @Column({ type: DataType.DATEONLY })
  dueDate!: string | null;

  @Column({ type: DataType.TEXT })
  remediationNotes!: string | null;

  @Column({ type: DataType.DATE })
  closedAt!: Date | null;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDemoData!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsTo(() => Audit)
  audit!: Audit;

  @BelongsTo(() => User)
  responsible!: User;

  @BelongsTo(() => Control)
  control!: Control;

  @BelongsTo(() => Risk)
  risk!: Risk;
}
