import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  CreatedAt,
  UpdatedAt,
  Default,
  PrimaryKey,
} from "sequelize-typescript";
import { Organization } from "../organization/organization.model";
import { Project } from "../project/project.model";
import { User } from "../user/user.model";
import { RiskAssessment } from "../riskAssessment/riskAssessment.model";
import { RiskTreatment } from "../riskTreatment/riskTreatment.model";
import { RiskCategory } from "../riskCategory/riskCategory.model";

@Table({ tableName: "risks", timestamps: true })
export class Risk extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.UUID, allowNull: false })
  organizationId!: string;

  @ForeignKey(() => Project)
  @Column({ type: DataType.UUID })
  projectId!: string | null;

  @Column({ type: DataType.STRING(255), allowNull: false })
  title!: string;

  @Column({ type: DataType.TEXT })
  description!: string;

  @Column({
    type: DataType.ENUM(
      "financial",
      "cybersecurity",
      "strategic",
      "operational",
      "regulatory"
    ),
    allowNull: false,
  })
  domain!: string;

  @Column({
    type: DataType.ENUM(
      "identified",
      "assessed",
      "treated",
      "accepted",
      "closed"
    ),
    defaultValue: "identified",
  })
  status!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  ownerId!: string | null;

  @Column({ type: DataType.INTEGER, validate: { min: 1, max: 25 } })
  riskAppetiteThreshold!: number | null;

  @Column({ type: DataType.INTEGER, validate: { min: 1 } })
  reviewCycleDays!: number | null;

  @Column({ type: DataType.DATEONLY })
  lastReviewedAt!: string | null;

  @Column({ type: DataType.DATEONLY })
  nextReviewDue!: string | null;

  @CreatedAt
  createdAt!: Date;

  @ForeignKey(() => RiskCategory)
  @Column({ type: DataType.UUID })
  categoryId!: string | null;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDemoData!: boolean;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsTo(() => Project)
  project!: Project;

  @BelongsTo(() => User)
  owner!: User;

  @BelongsTo(() => RiskCategory)
  category!: RiskCategory;

  @HasMany(() => RiskAssessment)
  assessments!: RiskAssessment[];

  @HasMany(() => RiskTreatment)
  treatments!: RiskTreatment[];
}
