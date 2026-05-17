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
import { RegulationRequirement } from "../regulationRequirement/regulationRequirement.model";
import { User } from "../user/user.model";

@Table({
  tableName: "requirement_implementations",
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ["organizationId", "requirementId"],
    },
  ],
})
export class RequirementImplementation extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.UUID, allowNull: false })
  organizationId!: string;

  @ForeignKey(() => RegulationRequirement)
  @Column({ type: DataType.UUID, allowNull: false })
  requirementId!: string;

  @Column({
    type: DataType.ENUM("not_started", "in_progress", "implemented", "not_applicable"),
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

  @Column({ type: DataType.JSONB })
  evidenceLinks!: string[] | null;

  @Column({ type: DataType.DATEONLY })
  dueDate!: string | null;

  @Column({ type: DataType.DATE })
  completedAt!: Date | null;

  @Column({ type: DataType.JSONB })
  controlIds!: string[] | null;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDemoData!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsTo(() => RegulationRequirement)
  requirement!: RegulationRequirement;

  @BelongsTo(() => User, "ownerId")
  owner!: User;

  @BelongsTo(() => User, "reviewerId")
  reviewer!: User;

  @BelongsTo(() => User, "approverId")
  approver!: User;
}
