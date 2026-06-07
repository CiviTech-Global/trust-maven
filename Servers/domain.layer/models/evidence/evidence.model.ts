import { Table, Column, Model, DataType, ForeignKey, BelongsTo, CreatedAt, UpdatedAt, Default, PrimaryKey } from "sequelize-typescript";
import { Organization } from "../organization/organization.model";
import { User } from "../user/user.model";

@Table({ tableName: "evidence", timestamps: true })
export class Evidence extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.UUID, allowNull: false })
  organizationId!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  entityType!: string;

  @Column({ type: DataType.UUID, allowNull: false })
  entityId!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  title!: string;

  @Column({ type: DataType.TEXT })
  description?: string;

  @Column({ type: DataType.STRING })
  filePath?: string;

  @Column({ type: DataType.STRING })
  fileType?: string;

  @Column({ type: DataType.STRING, defaultValue: "draft" })
  status!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  uploadedById!: string;

  @Column({ type: DataType.TEXT })
  notes?: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => User, "uploadedById")
  uploadedBy!: User;
}
