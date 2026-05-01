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
import { User } from "../user/user.model";

@Table({ tableName: "report_templates", timestamps: true })
export class ReportTemplate extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.UUID, allowNull: false })
  organizationId!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  createdById!: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  name!: string;

  @Column({ type: DataType.TEXT })
  description!: string | null;

  @Column({
    type: DataType.ENUM("risk", "control", "audit", "vendor", "kri"),
    allowNull: false,
  })
  entityType!: string;

  @Column({ type: DataType.JSONB, defaultValue: [] })
  columns!: { field: string; label: string }[];

  @Column({ type: DataType.JSONB, defaultValue: [] })
  filters!: { field: string; operator: string; value: string }[];

  @Column({ type: DataType.STRING(255) })
  groupBy!: string | null;

  @Column({ type: DataType.STRING(255) })
  sortBy!: string | null;

  @Column({
    type: DataType.ENUM("asc", "desc"),
    defaultValue: "asc",
  })
  sortOrder!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isShared!: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDemoData!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsTo(() => User)
  createdBy!: User;
}
