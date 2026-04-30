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

@Table({ tableName: "risk_treatments", timestamps: true })
export class RiskTreatment extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Risk)
  @Column({ type: DataType.UUID, allowNull: false })
  riskId!: string;

  @Column({
    type: DataType.ENUM("avoid", "mitigate", "transfer", "accept"),
    allowNull: false,
  })
  strategy!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description!: string;

  @Column({
    type: DataType.ENUM("planned", "in_progress", "completed"),
    defaultValue: "planned",
  })
  status!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  responsibleId!: string | null;

  @Column({ type: DataType.DATEONLY })
  dueDate!: string | null;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Risk)
  risk!: Risk;

  @BelongsTo(() => User)
  responsible!: User;
}
