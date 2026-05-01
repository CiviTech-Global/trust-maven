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
import { Risk } from "../risk/risk.model";
import { User } from "../user/user.model";

@Table({ tableName: "risk_assessments", timestamps: false })
export class RiskAssessment extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Risk)
  @Column({ type: DataType.UUID, allowNull: false })
  riskId!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  assessorId!: string;

  @Column({ type: DataType.INTEGER, allowNull: false, validate: { min: 1, max: 5 } })
  likelihood!: number;

  @Column({ type: DataType.INTEGER, allowNull: false, validate: { min: 1, max: 5 } })
  impact!: number;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      return (this.getDataValue("likelihood") || 0) * (this.getDataValue("impact") || 0);
    },
  })
  riskScore!: number;

  @Column({ type: DataType.STRING(100) })
  methodology!: string;

  @Column({ type: DataType.TEXT })
  notes!: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  assessedAt!: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDemoData!: boolean;

  @Column({
    type: DataType.ENUM("inherent", "residual"),
    defaultValue: "inherent",
  })
  assessmentType!: string;

  @Column({
    type: DataType.ENUM("draft", "pending_approval", "approved", "rejected"),
    defaultValue: "draft",
  })
  approvalStatus!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  approvedById!: string | null;

  @Column({ type: DataType.DATE })
  approvedAt!: Date | null;

  @CreatedAt
  createdAt!: Date;

  @BelongsTo(() => Risk)
  risk!: Risk;

  @BelongsTo(() => User)
  assessor!: User;

  @BelongsTo(() => User, "approvedById")
  approver!: User;
}
