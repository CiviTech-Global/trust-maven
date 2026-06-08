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

@Table({
  tableName: "entities",
  timestamps: true,
  indexes: [
    { fields: ["organizationId"] },
    { fields: ["parentId"] },
    { fields: ["organizationId", "parentId"] },
  ],
})
export class Entity extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.UUID, allowNull: false })
  organizationId!: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  name!: string;

  @Column({
    type: DataType.ENUM(
      "business_unit",
      "subsidiary",
      "department",
      "system",
      "application",
      "asset",
      "process",
      "data_asset"
    ),
    allowNull: false,
  })
  type!: string;

  @ForeignKey(() => Entity)
  @Column({ type: DataType.UUID })
  parentId!: string | null;

  @Column({ type: DataType.JSONB })
  attributes!: Record<string, unknown> | null;

  @Column({ type: DataType.DECIMAL(5, 2) })
  riskScore!: number | null;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsTo(() => Entity, "parentId")
  parent!: Entity | null;

  @HasMany(() => Entity, "parentId")
  children!: Entity[];
}
