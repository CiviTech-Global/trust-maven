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

@Table({ tableName: "trust_centers", timestamps: true })
export class TrustCenter extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.UUID, allowNull: false, unique: true })
  organizationId!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isPublic!: boolean;

  @Column({ type: DataType.STRING(255) })
  companyName!: string | null;

  @Column({ type: DataType.STRING })
  companyLogo!: string | null;

  @Column({ type: DataType.TEXT })
  description!: string | null;

  @Column({ type: DataType.STRING })
  supportEmail!: string | null;

  @Column({ type: DataType.STRING })
  supportUrl!: string | null;

  @Column({ type: DataType.JSONB })
  certifications!: { framework: string; status: string; certifiedSince?: string; expiresAt?: string; logo?: string }[] | null;

  @Column({ type: DataType.JSONB })
  controls!: { domain: string; title: string; status: string }[] | null;

  @Column({ type: DataType.JSONB })
  customSections!: Record<string, unknown>[] | null;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;
}
