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
  AllowNull,
} from "sequelize-typescript";
import { Organization } from "../organization/organization.model";

export interface WorkflowState {
  name: string;
  label: string;
  color: string;
  type: "initial" | "active" | "terminal";
  assigneeRole?: string;
  metadata?: Record<string, unknown>;
}

export interface WorkflowTransitionAction {
  notify: string[];
  autoAssign: string;
  setFields: Record<string, any>;
}

export interface WorkflowTransition {
  from: string;
  to: string;
  label: string;
  actions?: string[];
  requireComment?: boolean;
  allowedRoles?: string[];
  hooks?: WorkflowTransitionAction;
}

export type EntityType =
  | "common_control_implementation"
  | "policy"
  | "requirement_implementation"
  | "risk"
  | "vendor_assessment";

@Table({ tableName: "workflow_definitions", timestamps: true })
export class WorkflowDefinition extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @AllowNull(false)
  @Column({ type: DataType.UUID })
  organizationId!: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING(255) })
  name!: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(
      "common_control_implementation",
      "policy",
      "requirement_implementation",
      "risk",
      "vendor_assessment"
    ),
  })
  entityType!: EntityType;

  @AllowNull(false)
  @Column({ type: DataType.JSONB })
  states!: WorkflowState[];

  @AllowNull(false)
  @Column({ type: DataType.JSONB })
  transitions!: WorkflowTransition[];

  @Default(true)
  @Column({ type: DataType.BOOLEAN })
  isActive!: boolean;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  isDefault!: boolean;

  @Default(1)
  @Column({ type: DataType.INTEGER })
  version!: number;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;
}
