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
import { RegulationDefinition } from "../regulationDefinition/regulationDefinition.model";

@Table({ tableName: "regulation_requirements", timestamps: true })
export class RegulationRequirement extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => RegulationDefinition)
  @Column({ type: DataType.UUID, allowNull: false })
  regulationId!: string;

  @ForeignKey(() => RegulationRequirement)
  @Column({ type: DataType.UUID })
  parentId!: string | null;

  @Column({ type: DataType.STRING(50), allowNull: false })
  code!: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  title!: string;

  @Column({ type: DataType.TEXT })
  description!: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  level!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  orderNo!: number;

  @Column({ type: DataType.STRING(255) })
  category!: string | null;

  @Column({ type: DataType.JSONB })
  keyQuestions!: string[] | null;

  @Column({ type: DataType.JSONB })
  evidenceExamples!: string[] | null;

  @Column({ type: DataType.TEXT })
  implementationGuidance!: string | null;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => RegulationDefinition)
  regulation!: RegulationDefinition;

  @BelongsTo(() => RegulationRequirement, "parentId")
  parent!: RegulationRequirement;

  @HasMany(() => RegulationRequirement, "parentId")
  children!: RegulationRequirement[];
}
