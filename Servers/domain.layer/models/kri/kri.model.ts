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

@Table({ tableName: "kris", timestamps: true })
export class KRI extends Model {
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
  name!: string;

  @Column({ type: DataType.TEXT })
  description!: string;

  @Column({
    type: DataType.ENUM("financial", "cybersecurity", "operational", "regulatory", "strategic"),
    allowNull: false,
  })
  category!: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  currentValue!: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  thresholdGreen!: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  thresholdAmber!: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  thresholdRed!: number;

  @Column({
    type: DataType.ENUM("below_is_good", "above_is_good"),
    defaultValue: "below_is_good",
  })
  direction!: string;

  @Column({ type: DataType.STRING(50) })
  unit!: string | null;

  @Column({
    type: DataType.ENUM("daily", "weekly", "monthly", "quarterly"),
    defaultValue: "monthly",
  })
  frequency!: string;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      const val = this.getDataValue("currentValue");
      const green = this.getDataValue("thresholdGreen");
      const amber = this.getDataValue("thresholdAmber");
      const red = this.getDataValue("thresholdRed");
      const dir = this.getDataValue("direction");

      if (dir === "below_is_good") {
        if (val <= green) return "green";
        if (val <= amber) return "amber";
        return "red";
      } else {
        if (val >= green) return "green";
        if (val >= amber) return "amber";
        return "red";
      }
    },
  })
  status!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  ownerId!: string | null;

  @Column({ type: DataType.DATEONLY })
  lastUpdatedValue!: string | null;

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
