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
import { CommonControl } from "../commonControl/commonControl.model";
import { RegulationRequirement } from "../regulationRequirement/regulationRequirement.model";

@Table({
  tableName: "common_control_mappings",
  timestamps: true,
  indexes: [
    {
      unique: true,
      name: "uq_common_control_req",
      fields: ["commonControlId", "requirementId"],
    },
  ],
})
export class CommonControlMapping extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => CommonControl)
  @Column({ type: DataType.UUID, allowNull: false })
  commonControlId!: string;

  @ForeignKey(() => RegulationRequirement)
  @Column({ type: DataType.UUID, allowNull: false })
  requirementId!: string;

  @Column({
    type: DataType.ENUM(
      "subset_of",
      "intersects_with",
      "equal_to",
      "superset_of",
      "no_relationship"
    ),
    allowNull: false,
  })
  relationshipType!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 10 },
  })
  strength!: number;

  @Column({ type: DataType.TEXT })
  rationale!: string | null;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => CommonControl)
  commonControl!: CommonControl;

  @BelongsTo(() => RegulationRequirement)
  requirement!: RegulationRequirement;
}
