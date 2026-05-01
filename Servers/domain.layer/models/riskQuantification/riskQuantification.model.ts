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
import { User } from "../user/user.model";

@Table({ tableName: "risk_quantifications", timestamps: true })
export class RiskQuantification extends Model {
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

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  assessorId!: string;

  @Column({ type: DataType.DECIMAL(15, 2), allowNull: false })
  singleLossExpectancy!: number;

  @Column({ type: DataType.DECIMAL(8, 4), allowNull: false })
  annualRateOfOccurrence!: number;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      const sle = parseFloat(this.getDataValue("singleLossExpectancy")) || 0;
      const aro = parseFloat(this.getDataValue("annualRateOfOccurrence")) || 0;
      return Math.round(sle * aro * 100) / 100;
    },
  })
  annualLossExpectancy!: number;

  @Column({
    type: DataType.ENUM("low", "medium", "high"),
    defaultValue: "medium",
  })
  confidenceLevel!: string;

  @Column({ type: DataType.DECIMAL(8, 4) })
  lossEventFrequencyMin!: number | null;

  @Column({ type: DataType.DECIMAL(8, 4) })
  lossEventFrequencyMax!: number | null;

  @Column({ type: DataType.DECIMAL(15, 2) })
  lossMagnitudeMin!: number | null;

  @Column({ type: DataType.DECIMAL(15, 2) })
  lossMagnitudeMax!: number | null;

  @Column({ type: DataType.STRING(100), defaultValue: "simple_ale" })
  methodology!: string;

  @Column({ type: DataType.TEXT })
  assumptions!: string | null;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  assessedAt!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDemoData!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsTo(() => Risk)
  risk!: Risk;

  @BelongsTo(() => User)
  assessor!: User;
}
