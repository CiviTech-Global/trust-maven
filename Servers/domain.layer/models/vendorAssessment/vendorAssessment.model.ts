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
import { Vendor } from "../vendor/vendor.model";
import { User } from "../user/user.model";

@Table({ tableName: "vendor_assessments", timestamps: true })
export class VendorAssessment extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.UUID, allowNull: false })
  organizationId!: string;

  @ForeignKey(() => Vendor)
  @Column({ type: DataType.UUID, allowNull: false })
  vendorId!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  assessorId!: string | null;

  @Column({ type: DataType.STRING(255), allowNull: false })
  title!: string;

  @Column({
    type: DataType.ENUM("security", "privacy", "compliance", "operational", "financial"),
    allowNull: false,
  })
  assessmentType!: string;

  @Column({
    type: DataType.ENUM("draft", "in_progress", "completed", "expired"),
    defaultValue: "draft",
  })
  status!: string;

  @Column({
    type: DataType.ENUM("critical", "high", "medium", "low", "negligible"),
  })
  riskRating!: string | null;

  @Column({ type: DataType.INTEGER, validate: { min: 0, max: 100 } })
  score!: number | null;

  @Column({ type: DataType.JSONB, defaultValue: [] })
  questionnaire!: { question: string; answer: string; score?: number; notes?: string }[];

  @Column({ type: DataType.JSONB, defaultValue: [] })
  findings!: { severity: string; description: string; recommendation: string }[];

  @Column({ type: DataType.TEXT })
  summary!: string | null;

  @Column({ type: DataType.DATEONLY })
  assessedAt!: string | null;

  @Column({ type: DataType.DATEONLY })
  nextReviewDate!: string | null;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDemoData!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsTo(() => Vendor)
  vendor!: Vendor;

  @BelongsTo(() => User)
  assessor!: User;
}
