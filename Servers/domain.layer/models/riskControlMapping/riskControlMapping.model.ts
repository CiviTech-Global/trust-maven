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
import { Risk } from "../risk/risk.model";
import { Control } from "../control/control.model";
import { User } from "../user/user.model";

@Table({ tableName: "risk_control_mappings", timestamps: false })
export class RiskControlMapping extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Risk)
  @Column({ type: DataType.UUID, allowNull: false })
  riskId!: string;

  @ForeignKey(() => Control)
  @Column({ type: DataType.UUID, allowNull: false })
  controlId!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  mappedById!: string | null;

  @CreatedAt
  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  mappedAt!: Date;

  @BelongsTo(() => Risk)
  risk!: Risk;

  @BelongsTo(() => Control)
  control!: Control;

  @BelongsTo(() => User)
  mappedBy!: User;
}
