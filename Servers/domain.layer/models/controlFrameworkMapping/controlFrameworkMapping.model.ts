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
import { Control } from "../control/control.model";
import { Framework } from "../framework/framework.model";
import { RequirementImplementation } from "../requirementImplementation/requirementImplementation.model";
import { RegulationRequirement } from "../regulationRequirement/regulationRequirement.model";

@Table({ tableName: "control_framework_mappings", timestamps: false })
export class ControlFrameworkMapping extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Control)
  @Column({ type: DataType.UUID, allowNull: false })
  controlId!: string;

  @ForeignKey(() => Framework)
  @Column({ type: DataType.UUID, allowNull: false })
  frameworkId!: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  requirementId!: string;

  @ForeignKey(() => RequirementImplementation)
  @Column({ type: DataType.UUID })
  requirementImplId!: string | null;

  @ForeignKey(() => RegulationRequirement)
  @Column({ type: DataType.UUID })
  regulationRequirementId!: string | null;

  @CreatedAt
  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  mappedAt!: Date;

  @BelongsTo(() => Control)
  control!: Control;

  @BelongsTo(() => Framework)
  framework!: Framework;

  @BelongsTo(() => RequirementImplementation)
  requirementImpl!: RequirementImplementation;

  @BelongsTo(() => RegulationRequirement)
  regulationRequirement!: RegulationRequirement;
}
