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
import { WorkflowDefinition } from "../workflowDefinition/workflowDefinition.model";
import { User } from "../user/user.model";

@Table({ tableName: "workflow_executions", timestamps: true })
export class WorkflowExecution extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @AllowNull(false)
  @Column({ type: DataType.UUID })
  organizationId!: string;

  @ForeignKey(() => WorkflowDefinition)
  @AllowNull(false)
  @Column({ type: DataType.UUID })
  workflowDefinitionId!: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  entityType!: string;

  @AllowNull(false)
  @Column({ type: DataType.UUID })
  entityId!: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  fromState!: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  toState!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({ type: DataType.UUID })
  transitionedBy!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  comment!: string | null;

  @Column({ type: DataType.JSONB, allowNull: true })
  metadata!: Record<string, unknown> | null;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsTo(() => WorkflowDefinition)
  workflowDefinition!: WorkflowDefinition;

  @BelongsTo(() => User, "transitionedBy")
  user!: User;
}
