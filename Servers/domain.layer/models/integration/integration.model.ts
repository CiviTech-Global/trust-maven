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

@Table({
  tableName: "integrations",
  timestamps: true,
  indexes: [
    { fields: ["organizationId"] },
    { fields: ["organizationId", "connectorType"] },
  ],
})
export class Integration extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.UUID, allowNull: false })
  organizationId!: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  connectorType!: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  name!: string;

  @Column({ type: DataType.JSONB, allowNull: false })
  config!: Record<string, unknown>;

  @Column({
    type: DataType.ENUM("connected", "disconnected", "error"),
    defaultValue: "disconnected",
  })
  status!: string;

  @Column({ type: DataType.DATE })
  lastSyncAt!: Date | null;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive!: boolean;

  @Column({ type: DataType.JSONB })
  metadata!: Record<string, unknown> | null;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;
}
