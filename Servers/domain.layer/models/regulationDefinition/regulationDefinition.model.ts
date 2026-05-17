import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  CreatedAt,
  UpdatedAt,
  Default,
  PrimaryKey,
  Unique,
} from "sequelize-typescript";
import { RegulationRequirement } from "../regulationRequirement/regulationRequirement.model";

@Table({ tableName: "regulation_definitions", timestamps: true })
export class RegulationDefinition extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Unique
  @Column({ type: DataType.STRING(50), allowNull: false })
  code!: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING(50) })
  version!: string;

  @Column({
    type: DataType.ENUM("framework", "regulation", "standard"),
    allowNull: false,
  })
  type!: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  category!: string;

  @Column({ type: DataType.STRING(100) })
  jurisdiction!: string | null;

  @Column({ type: DataType.TEXT })
  description!: string;

  @Column({ type: DataType.STRING(255) })
  issuer!: string;

  @Column({ type: DataType.DATEONLY })
  effectiveDate!: string | null;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive!: boolean;

  @Column({ type: DataType.JSONB })
  metadata!: Record<string, unknown> | null;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @HasMany(() => RegulationRequirement)
  requirements!: RegulationRequirement[];
}
