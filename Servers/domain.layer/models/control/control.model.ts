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

@Table({ tableName: "controls", timestamps: true })
export class Control extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.UUID, allowNull: false })
  organizationId!: string;

  @ForeignKey(() => Risk)
  @Column({ type: DataType.UUID })
  riskId!: string | null;

  @Column({ type: DataType.STRING(255), allowNull: false })
  title!: string;

  @Column({ type: DataType.TEXT })
  description!: string;

  @Column({
    type: DataType.ENUM("preventive", "detective", "corrective"),
    allowNull: false,
  })
  type!: string;

  @Column({
    type: DataType.ENUM("effective", "partially_effective", "ineffective"),
    defaultValue: "effective",
  })
  effectiveness!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  ownerId!: string | null;

  @Column({
    type: DataType.ENUM("effective", "partially_effective", "ineffective"),
    defaultValue: "effective",
  })
  designEffectiveness!: string;

  @Column({
    type: DataType.ENUM("effective", "partially_effective", "ineffective"),
    defaultValue: "effective",
  })
  operatingEffectiveness!: string;

  @Column({
    type: DataType.ENUM("inquiry", "observation", "inspection", "reperformance"),
  })
  testingMethod!: string | null;

  @Column({ type: DataType.DATE })
  lastTestedAt!: Date | null;

  @Column({ type: DataType.DATEONLY })
  nextTestDue!: string | null;

  @Column({
    type: DataType.ENUM("monthly", "quarterly", "semi_annually", "annually"),
  })
  testFrequency!: string | null;

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
  owner!: User;
}
