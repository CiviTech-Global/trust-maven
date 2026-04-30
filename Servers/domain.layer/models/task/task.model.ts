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
import { User } from "../user/user.model";

@Table({ tableName: "tasks", timestamps: true })
export class Task extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.UUID, allowNull: false })
  organizationId!: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  title!: string;

  @Column({ type: DataType.TEXT })
  description!: string;

  @Column({
    type: DataType.ENUM("todo", "in_progress", "done"),
    defaultValue: "todo",
  })
  status!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  assigneeId!: string | null;

  @Column({ type: DataType.DATEONLY })
  dueDate!: string | null;

  @Column({ type: DataType.STRING(100) })
  relatedEntityType!: string | null;

  @Column({ type: DataType.UUID })
  relatedEntityId!: string | null;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsTo(() => User)
  assignee!: User;
}
