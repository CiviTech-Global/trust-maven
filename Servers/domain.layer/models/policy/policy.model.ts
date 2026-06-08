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

@Table({ tableName: "policies", timestamps: true })
export class Policy extends Model {
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
  content!: string;

  @Column({ type: DataType.STRING(20), defaultValue: "1.0" })
  version!: string;

  @Column({
    type: DataType.ENUM("draft", "review", "approved", "retired"),
    defaultValue: "draft",
  })
  status!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  ownerId!: string | null;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: true })
  reviewerId!: string | null;

  @Column({ type: DataType.DATE })
  approvedAt!: Date | null;

  @Column({ type: DataType.DATE, allowNull: true })
  submittedAt!: Date | null;

  @Column({ type: DataType.DATE, allowNull: true })
  retiredAt!: Date | null;

  @Column({ type: DataType.JSONB, allowNull: true })
  changeHistory!: object[] | null;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsTo(() => User)
  owner!: User;

  @BelongsTo(() => User, "reviewerId")
  reviewer!: User;
}
