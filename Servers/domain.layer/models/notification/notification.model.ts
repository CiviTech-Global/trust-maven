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
import { User } from "../user/user.model";

@Table({ tableName: "notifications", timestamps: false })
export class Notification extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId!: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  title!: string;

  @Column({ type: DataType.TEXT })
  message!: string;

  @Column({ type: DataType.STRING(50), defaultValue: "info" })
  type!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isRead!: boolean;

  @Column({ type: DataType.STRING(100) })
  relatedEntityType!: string | null;

  @Column({ type: DataType.UUID })
  relatedEntityId!: string | null;

  @CreatedAt
  createdAt!: Date;

  @BelongsTo(() => User)
  user!: User;
}
