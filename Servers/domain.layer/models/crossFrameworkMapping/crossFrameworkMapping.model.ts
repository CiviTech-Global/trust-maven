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
import { RegulationRequirement } from "../regulationRequirement/regulationRequirement.model";

@Table({
  tableName: "cross_framework_mappings",
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ["sourceRequirementId", "targetRequirementId"],
    },
  ],
})
export class CrossFrameworkMapping extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => RegulationRequirement)
  @Column({ type: DataType.UUID, allowNull: false })
  sourceRequirementId!: string;

  @ForeignKey(() => RegulationRequirement)
  @Column({ type: DataType.UUID, allowNull: false })
  targetRequirementId!: string;

  @Column({
    type: DataType.ENUM("high", "medium", "low"),
    allowNull: false,
  })
  relevance!: string;

  @Column({
    type: DataType.ENUM("equivalent", "overlapping", "related", "partial"),
    allowNull: false,
  })
  mappingType!: string;

  @Column({ type: DataType.TEXT })
  notes!: string | null;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => RegulationRequirement, "sourceRequirementId")
  sourceRequirement!: RegulationRequirement;

  @BelongsTo(() => RegulationRequirement, "targetRequirementId")
  targetRequirement!: RegulationRequirement;
}
