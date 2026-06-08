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
import { CommonControl } from "../commonControl/commonControl.model";
import { User } from "../user/user.model";

@Table({
  tableName: "common_control_implementations",
  timestamps: true,
  indexes: [
    {
      unique: true,
      name: "uq_org_control",
      fields: ["organizationId", "commonControlId"],
    },
  ],
})
export class CommonControlImplementation extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.UUID, allowNull: false })
  organizationId!: string;

  @ForeignKey(() => CommonControl)
  @Column({ type: DataType.UUID, allowNull: false })
  commonControlId!: string;

  @Column({
    type: DataType.ENUM(
      "not_started",
      "draft",
      "in_progress",
      "awaiting_review",
      "awaiting_approval",
      "implemented",
      "needs_rework",
      "not_applicable"
    ),
    defaultValue: "not_started",
  })
  status!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  ownerId!: string | null;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  reviewerId!: string | null;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  approverId!: string | null;

  @Column({ type: DataType.TEXT })
  implementationNotes!: string | null;

  @Column({ type: DataType.TEXT })
  implementationDetails!: string | null;

  @Column({ type: DataType.JSONB })
  evidenceIds!: string[] | null;

  @Column({ type: DataType.DATEONLY })
  dueDate!: string | null;

  @Column({ type: DataType.DATE })
  completedAt!: Date | null;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDemoData!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsTo(() => CommonControl)
  commonControl!: CommonControl;

  @BelongsTo(() => User, "ownerId")
  owner!: User;

  @BelongsTo(() => User, "reviewerId")
  reviewer!: User;

  @BelongsTo(() => User, "approverId")
  approver!: User;
}
