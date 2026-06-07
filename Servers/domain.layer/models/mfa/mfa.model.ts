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
import { User } from "../user/user.model";

@Table({ tableName: "mfa_settings", timestamps: true })
export class MfaSetting extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false, unique: true })
  userId!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isEnabled!: boolean;

  @Column({ type: DataType.STRING(500) })
  secret!: string;

  @Column({ type: DataType.STRING(20), defaultValue: "totp" })
  method!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => User)
  user!: User;
}
