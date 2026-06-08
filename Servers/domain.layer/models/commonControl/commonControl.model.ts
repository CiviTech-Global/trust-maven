import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  Default,
  PrimaryKey,
  Unique,
  HasMany,
} from "sequelize-typescript";
import { CommonControlMapping } from "../commonControlMapping/commonControlMapping.model";

@Table({ tableName: "common_controls", timestamps: true })
export class CommonControl extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Unique
  @Column({ type: DataType.STRING(50), allowNull: false })
  code!: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  title!: string;

  @Column({ type: DataType.TEXT })
  description!: string;

  @Column({ type: DataType.TEXT })
  objective!: string | null;

  @Column({ type: DataType.STRING(100), allowNull: false })
  domain!: string;

  @Column({ type: DataType.TEXT })
  implementationGuidance!: string | null;

  @Column({ type: DataType.JSONB })
  assessmentCriteria!: string[] | null;

  @Column({ type: DataType.JSONB })
  evidenceRequestList!: string[] | null;

  @Column({
    type: DataType.ENUM("low", "medium", "high", "critical"),
    defaultValue: "medium",
  })
  controlWeight!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @HasMany(() => CommonControlMapping)
  mappings!: CommonControlMapping[];
}
