import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  Default,
  PrimaryKey,
} from "sequelize-typescript";
import { Organization } from "../organization/organization.model";
import { User } from "../user/user.model";

@Table({ tableName: "audit_logs", timestamps: false, updatedAt: false })
export class AuditLog extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.UUID, allowNull: false })
  organizationId!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId!: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  entityType!: string;

  @Column({ type: DataType.UUID, allowNull: false })
  entityId!: string;

  @Column({
    type: DataType.ENUM("create", "update", "delete"),
    allowNull: false,
  })
  action!: string;

  @Column({ type: DataType.JSONB, defaultValue: {} })
  changes!: Record<string, unknown>;

  @Column({ type: DataType.STRING(45) })
  ipAddress!: string;

  @CreatedAt
  createdAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsTo(() => User)
  user!: User;
}
