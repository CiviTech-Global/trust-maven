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
import { User } from "../user/user.model";

@Table({ tableName: "audits", timestamps: true })
export class Audit extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.UUID, allowNull: false })
  organizationId!: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  title!: string;

  @Column({ type: DataType.TEXT })
  description!: string | null;

  @Column({
    type: DataType.ENUM("internal", "external"),
    allowNull: false,
  })
  auditType!: string;

  @Column({
    type: DataType.ENUM("planned", "in_progress", "completed", "cancelled"),
    defaultValue: "planned",
  })
  status!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  leadAuditorId!: string | null;

  @Column({ type: DataType.TEXT })
  scope!: string | null;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  startDate!: string;

  @Column({ type: DataType.DATEONLY })
  endDate!: string | null;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDemoData!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsTo(() => User)
  leadAuditor!: User;
}
