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
import { Risk } from "../risk/risk.model";

@Table({
  tableName: "fair_analyses",
  timestamps: true,
  indexes: [{ fields: ["organizationId"] }, { fields: ["riskId"] }],
})
export class FairAnalysis extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.UUID, allowNull: false })
  organizationId!: string;

  @ForeignKey(() => Risk)
  @Column({ type: DataType.UUID, allowNull: false })
  riskId!: string;

  @Column({
    type: DataType.ENUM("fair", "monte_carlo", "simple_ale"),
    defaultValue: "fair",
  })
  methodology!: string;

  @Column({ type: DataType.JSONB })
  lossEventFrequency!: { min?: number; max?: number; mostLikely?: number; distribution?: string } | null;

  @Column({ type: DataType.JSONB })
  lossMagnitude!: { min?: number; max?: number; mostLikely?: number; distribution?: string } | null;

  @Column({ type: DataType.DECIMAL(10, 4) })
  threatEventFrequency!: number | null;

  @Column({ type: DataType.DECIMAL(5, 2) })
  vulnerability!: number | null;

  @Column({ type: DataType.DECIMAL(15, 2) })
  lossMagnitudeMin!: number | null;

  @Column({ type: DataType.DECIMAL(15, 2) })
  lossMagnitudeMostLikely!: number | null;

  @Column({ type: DataType.DECIMAL(15, 2) })
  lossMagnitudeMax!: number | null;

  @Column({ type: DataType.DECIMAL(15, 2) })
  annualLossExpectancy!: number | null;

  @Column({ type: DataType.DECIMAL(5, 2) })
  confidenceInterval!: number | null;

  @Column({ type: DataType.INTEGER, defaultValue: 10000 })
  simulationRuns!: number;

  @Column({ type: DataType.JSONB })
  simulationResults!: Record<string, unknown> | null;

  @Column({ type: DataType.TEXT })
  assumptions!: string | null;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsTo(() => Risk)
  risk!: Risk;
}
