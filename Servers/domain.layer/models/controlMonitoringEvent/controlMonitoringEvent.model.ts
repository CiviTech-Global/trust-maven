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
import { Control } from "../control/control.model";
import { User } from "../user/user.model";

@Table({ tableName: "control_monitoring_events", timestamps: true })
export class ControlMonitoringEvent extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.UUID, allowNull: false })
  organizationId!: string;

  @ForeignKey(() => Control)
  @Column({ type: DataType.UUID, allowNull: false })
  controlId!: string;

  @Column({
    type: DataType.ENUM("pass", "fail", "error", "skipped"),
    allowNull: false,
  })
  status!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  executedAt!: Date;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  executedById!: string | null;

  @Column({ type: DataType.TEXT })
  notes!: string | null;

  @Column({ type: DataType.TEXT })
  evidence!: string | null;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDemoData!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsTo(() => Control)
  control!: Control;

  @BelongsTo(() => User)
  executedBy!: User;
}
