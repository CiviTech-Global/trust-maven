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

@Table({ tableName: "risk_categories", timestamps: true })
export class RiskCategory extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.UUID, allowNull: false })
  organizationId!: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  name!: string;

  @Column({ type: DataType.TEXT })
  description!: string | null;

  @ForeignKey(() => RiskCategory)
  @Column({ type: DataType.UUID })
  parentId!: string | null;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  level!: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  sortOrder!: number;

  @Column({ type: DataType.STRING(50) })
  code!: string | null;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive!: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDemoData!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsTo(() => RiskCategory, "parentId")
  parent!: RiskCategory;

  @HasMany(() => RiskCategory, "parentId")
  children!: RiskCategory[];
}
